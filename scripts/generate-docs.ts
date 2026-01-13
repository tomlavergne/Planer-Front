import { Project, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InputMetadata {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface OutputMetadata {
  name: string;
  type: string;
  description: string;
}

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
});

// Ajouter manuellement les fichiers source
project.addSourceFilesAtPaths('src/**/*.ts');

// Chercher uniquement les composants et directives dans shared
const sourceFiles = project.getSourceFiles('src/**/*.ts').filter((file) => {
  const filePath = file.getFilePath();
  const fileName = path.basename(filePath);

  // Vérifier que c'est dans shared/components ou shared/directives
  const isInSharedComponents = filePath.includes('/shared/components/');
  const isInSharedDirectives = filePath.includes('/shared/directives/');

  if (!isInSharedComponents && !isInSharedDirectives) {
    return false;
  }

  // Exclure les fichiers de test, types, config, etc.
  return (
    !fileName.endsWith('.spec.ts') &&
    !fileName.endsWith('.type.ts') &&
    !fileName.endsWith('.config.ts') &&
    !fileName.endsWith('.inputs.ts') &&
    !fileName.endsWith('.routes.ts')
  );
});

console.log(`🔍 ${sourceFiles.length} fichiers TypeScript trouvés dans shared/\n`);

let generatedCount = 0;

sourceFiles.forEach((file) => {
  const inputs: InputMetadata[] = [];
  const outputs: OutputMetadata[] = [];

  // Parcourir toutes les classes du fichier
  file.getClasses().forEach((cls) => {
    // Parcourir toutes les propriétés de la classe
    cls.getProperties().forEach((prop) => {
      const initializer = prop.getInitializer();

      // Vérifier si c'est un input()
      if (
        initializer?.getText().startsWith('input(') ||
        initializer?.getText().startsWith('input<')
      ) {
        const name = prop.getName();

        // Extraire le type depuis la signature complète de la propriété
        let type = 'any';

        // Essayer d'abord depuis le typeNode explicite
        const typeNode = prop.getTypeNode();
        if (typeNode) {
          type = typeNode.getText();
        } else {
          // Sinon, essayer depuis le type générique de input<Type>
          const initText = initializer.getText();
          const genericMatch = initText.match(/input<([^>]+)>/);
          if (genericMatch) {
            type = genericMatch[1];
          } else {
            // Essayer d'inférer le type depuis la valeur par défaut
            const inferredType = prop.getType().getText();
            if (inferredType !== 'any') {
              type = inferredType.replace('InputSignal<', '').replace('>', '');
            }
          }
        }

        // Extraire la valeur par défaut
        let defaultValue = 'undefined';
        const initText = initializer.getText();
        // Extraire le premier argument de input(...)
        const argsMatch = initText.match(/input(?:<[^>]+>)?\(([^,)]+)/);
        if (argsMatch) {
          defaultValue = argsMatch[1].trim();
        }

        // Extraire la description depuis JSDoc (en prenant le dernier si plusieurs)
        let description = '';
        const jsDocs = prop.getJsDocs();
        // Prendre le dernier JSDoc (le plus proche de la propriété)
        if (jsDocs.length > 0) {
          const jsDoc = jsDocs[jsDocs.length - 1];
          const desc = jsDoc.getDescription();
          description = typeof desc === 'string' ? desc.trim() : (typeof desc === 'object' && desc ? String(desc).trim() : '');

          // Si toujours vide, essayer de parser le texte complet
          if (!description) {
            const fullText = jsDoc.getText();
            const match = fullText.match(/\/\*\*\s*([^*].*?)\s*\*\//s);
            if (match) {
              description = match[1].trim();
            }
          }

          // Ignorer les commentaires de section (que des astérisques)
          if (/^[\s*\/]+$/.test(description)) {
            description = '';
          }
        }

        inputs.push({
          name,
          type,
          default: defaultValue,
          description,
        });
      }

      // Vérifier si c'est un output()
      if (
        initializer?.getText().startsWith('output(') ||
        initializer?.getText().startsWith('output<')
      ) {
        const name = prop.getName();

        // Extraire le type depuis la signature
        let type = 'void';

        const typeNode = prop.getTypeNode();
        if (typeNode) {
          type = typeNode.getText();
        } else {
          // Essayer depuis le type générique de output<Type>
          const initText = initializer.getText();
          const genericMatch = initText.match(/output<([^>]+)>/);
          if (genericMatch) {
            type = genericMatch[1];
          }
        }

        // Extraire la description depuis JSDoc (en prenant le dernier si plusieurs)
        let description = '';
        const jsDocs = prop.getJsDocs();
        // Prendre le dernier JSDoc (le plus proche de la propriété)
        if (jsDocs.length > 0) {
          const jsDoc = jsDocs[jsDocs.length - 1];
          const desc = jsDoc.getDescription();
          description = typeof desc === 'string' ? desc.trim() : (typeof desc === 'object' && desc ? String(desc).trim() : '');

          // Si toujours vide, essayer de parser le texte complet
          if (!description) {
            const fullText = jsDoc.getText();
            const match = fullText.match(/\/\*\*\s*([^*].*?)\s*\*\//s);
            if (match) {
              description = match[1].trim();
            }
          }

          // Ignorer les commentaires de section (que des astérisques)
          if (/^[\s*\/]+$/.test(description)) {
            description = '';
          }
        }

        outputs.push({
          name,
          type,
          description,
        });
      }
    });
  });

  // Si on a trouvé des inputs ou outputs, générer le fichier
  if (inputs.length > 0 || outputs.length > 0) {
    const filePath = file.getFilePath();
    const fileDir = path.dirname(filePath);
    const fileBaseName = path.basename(filePath, '.ts');

    // Vérifier si un dossier 'doc' existe
    const docDir = path.join(fileDir, 'doc');
    const docExists = fs.existsSync(docDir);

    // Générer dans doc/ si existe, sinon au même niveau
    const outputPath = docExists
      ? path.join(docDir, `${fileBaseName}.inputs.ts`)
      : path.join(fileDir, `${fileBaseName}.inputs.ts`);

    const content = `/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

${inputs.length > 0 ? `export const COMPONENT_INPUTS_METADATA = ${JSON.stringify(inputs, null, 2)} as const;\n` : ''}
${outputs.length > 0 ? `export const COMPONENT_OUTPUTS_METADATA = ${JSON.stringify(outputs, null, 2)} as const;` : ''}
`;

    project.createSourceFile(outputPath, content, { overwrite: true });
    generatedCount++;

    console.log(`✅ Généré: ${path.relative(process.cwd(), outputPath)}`);
  }
});

// Sauvegarder tous les fichiers générés
project.saveSync();

console.log(`\n🎉 ${generatedCount} fichier(s) de documentation généré(s) avec succès !`);
