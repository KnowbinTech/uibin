import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import ora from 'ora';
import kleur from 'kleur';
import { glob } from 'glob';

// Helper function to ensure directory exists
function ensureDirSync(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper function to copy file
function copyFileSync(src: string, dest: string) {
  ensureDirSync(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// Helper function to fix import paths in copied files
function fixImportPaths(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix .js extensions to .ts
  content = content.replace(/from ['"](.+)\.js['"]/g, 'from "$1.ts"');
  
  // Fix missing relative paths (this is a simple fix and might need adjustment)
  content = content.replace(/from ['"](\$lib)/g, 'from "../$1');
  
  // Write fixed content back
  fs.writeFileSync(filePath, content, 'utf8');
}

// Get the directory where the templates are located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.resolve(__dirname, '..', 'templates');

const program = new Command();

program
  .name('uibin')
  .description('CLI to add UIBIN UI components to your project')
  .version('0.0.6');

program
  .command('add')
  .description('Add components to your project')
  .argument('[component]', 'Component to add (use "all" for all components)')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-s, --storybook', 'Include Storybook files', false)
  .action(async (component, options) => {
    try {
      // List of available components
      const availableComponents = ['ThemeProvider', 'ThemeToggle', 'Button', 'Card', 'Box', 'Container'];

      let selectedComponents: string[] = [];
      
      if (component === 'all') {
        selectedComponents = [...availableComponents];
      } else if (component) {
        if (availableComponents.includes(component)) {
          selectedComponents = [component];
        } else {
          console.log(
            kleur.red(`Component "${component}" not found. Available components: ${availableComponents.join(', ')}`)
          );
          return;
        }
      } else {
        // If no component specified, show multi-select prompt
        const { components } = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Select components to add',
          choices: availableComponents.map((comp) => ({
            title: comp,
            value: comp,
          })),
          hint: 'Space to select, Enter to confirm'
        });
        
        selectedComponents = components;
      }

      if (!selectedComponents || selectedComponents.length === 0) {
        console.log(kleur.yellow('No components selected, exiting...'));
        return;
      }

      // Determine the target paths
      const targetLibDir = path.resolve(process.cwd(), 'src', 'lib');
      const targetComponentsDir = path.resolve(targetLibDir, 'components', 'uibin');
      
      // Ensure directories exist
      ensureDirSync(targetComponentsDir);

      // Confirm installation
      if (!options.yes) {
        const componentsStr = selectedComponents.join(', ');
        const { confirmed } = await prompts({
          type: 'confirm',
          name: 'confirmed',
          message: `Add ${componentsStr} to ${targetComponentsDir}?`,
          initial: true,
        });

        if (!confirmed) {
          console.log(kleur.yellow('Installation cancelled.'));
          return;
        }
      }

      const spinner = ora(`Adding components...`).start();
      
      // Process each selected component
      for (const selectedComponent of selectedComponents) {
        // Get template component directory
        const sourceComponentDir = path.resolve(
          templatesDir,
          'components',
          selectedComponent
        );

        if (!fs.existsSync(sourceComponentDir)) {
          spinner.warn(`Component template not found: ${selectedComponent}`);
          continue;
        }

        // Get all files in the component directory
        const componentFiles = await glob('**/*', {
          cwd: sourceComponentDir,
          dot: true,
          nodir: true,
        });

        // Copy component files
        const targetComponentDir = path.resolve(targetComponentsDir, selectedComponent);
        ensureDirSync(targetComponentDir);

        for (const file of componentFiles) {
          // Skip Storybook files if not requested
          if (!options.storybook && file.includes('.stories.')) {
            continue;
          }

          const srcFile = path.join(sourceComponentDir, file);
          const destFile = path.join(targetComponentDir, file);

          ensureDirSync(path.dirname(destFile));
          copyFileSync(srcFile, destFile);
          
          // Fix import paths if it's a TypeScript or Svelte file
          if (destFile.endsWith('.ts') || destFile.endsWith('.svelte')) {
            fixImportPaths(destFile);
          }
        }

        // Add theme files if installing ThemeProvider
        if (selectedComponent === 'ThemeProvider') {
          const themeDir = path.resolve(targetLibDir, 'theme');
          ensureDirSync(themeDir);
          
          const sourceThemeDir = path.resolve(templatesDir, 'theme');
          const themeFiles = await glob('**/*', {
            cwd: sourceThemeDir,
            dot: true,
            nodir: true,
          });

          for (const file of themeFiles) {
            const srcFile = path.join(sourceThemeDir, file);
            const destFile = path.join(themeDir, file);
            
            ensureDirSync(path.dirname(destFile));
            copyFileSync(srcFile, destFile);
            
            // Fix imports in theme files
            if (destFile.endsWith('.ts')) {
              fixImportPaths(destFile);
            }
          }
          
          // Copy the theme types
          const typesDir = path.resolve(targetLibDir, 'types');
          ensureDirSync(typesDir);
          
          const sourceTypesDir = path.resolve(templatesDir, 'types');
          const typesFile = path.join(typesDir, 'theme.ts');
          copyFileSync(
            path.join(sourceTypesDir, 'theme.ts'),
            typesFile
          );
          fixImportPaths(typesFile);
          
          // Copy the utils
          const utilsDir = path.resolve(targetLibDir, 'utils');
          ensureDirSync(utilsDir);
          
          const sourceUtilsDir = path.resolve(templatesDir, 'utils');
          const utilsFile = path.join(utilsDir, 'deepMerge.ts');
          copyFileSync(
            path.join(sourceUtilsDir, 'deepMerge.ts'),
            utilsFile
          );
          fixImportPaths(utilsFile);
        }
        
        // Copy the hooks
        if (selectedComponent === 'ThemeProvider' || selectedComponent === 'ThemeToggle') {
          const hooksDir = path.resolve(targetLibDir, 'hooks');
          ensureDirSync(hooksDir);
          
          const sourceHooksDir = path.resolve(templatesDir, 'hooks');
          const hooksFile = path.join(hooksDir, 'useTheme.ts');
          copyFileSync(
            path.join(sourceHooksDir, 'useTheme.ts'),
            hooksFile
          );
          fixImportPaths(hooksFile);
        }
      }

      spinner.succeed(`Components added to ${targetComponentsDir}`);
      
      // Add CSS file if theme provider was installed
      if (selectedComponents.includes('ThemeProvider')) {
        const cssPath = path.resolve(process.cwd(), 'src', 'app.css');
        const sourceThemeCss = path.resolve(templatesDir, 'app', 'styles.css');
        
        if (fs.existsSync(cssPath)) {
          console.log(kleur.yellow(`\nFound existing app.css file. Please ensure it includes Tailwind 4 theme configuration.`));
          console.log(kleur.blue(`You can copy the theme configuration from: ${sourceThemeCss}`));
        } else {
          copyFileSync(sourceThemeCss, cssPath);
          console.log(kleur.green(`\nCreated app.css with theme configuration.`));
        }
      }

      // Provide instructions for usage
      console.log(kleur.green('\nComponents added successfully! ✨'));
      console.log(kleur.blue('You can now import them in your project:'));
      
      for (const comp of selectedComponents) {
        console.log(kleur.white(`\nimport { ${comp} } from '$lib/components/uibin/${comp}';`));
      }
      
      if (selectedComponents.includes('ThemeProvider')) {
        console.log(kleur.blue('\nAdd the ThemeProvider to your root layout:'));
        console.log(kleur.white(`
<script>
  import '../app.css';
  import { ThemeProvider } from '$lib/components/uibin/ThemeProvider';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>
        `));
      }
      
    } catch (error) {
      console.error(kleur.red('\nError adding components:'));
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize UIBIN in your project')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-s, --storybook', 'Set up Storybook configuration', false)
  .action(async (options) => {
    try {
      if (!options.yes) {
        const { confirmed } = await prompts({
          type: 'confirm',
          name: 'confirmed',
          message: 'This will set up UIBIN in your project. Continue?',
          initial: true,
        });

        if (!confirmed) {
          console.log(kleur.yellow('Initialization cancelled.'));
          return;
        }
      }

      const spinner = ora('Setting up UIBIN in your project...').start();

      // Create directories
      const libDir = path.resolve(process.cwd(), 'src', 'lib');
      const componentsDir = path.resolve(libDir, 'components');
      const uibinDir = path.resolve(componentsDir, 'uibin');
      ensureDirSync(uibinDir);

      // Add CSS file
      const sourceThemeCss = path.resolve(templatesDir, 'app', 'styles.css');
      const appCssPath = path.resolve(process.cwd(), 'src', 'app.css');
      
      // Copy theme CSS
      copyFileSync(sourceThemeCss, appCssPath);
      
      // Setup Storybook if requested
      if (options.storybook) {
        try {
          const storybookDir = path.resolve(process.cwd(), '.storybook');
          ensureDirSync(storybookDir);
          
          const sourceStorybookDir = path.resolve(templatesDir, 'storybook');
          const storybookFiles = await glob('**/*', {
            cwd: sourceStorybookDir,
            dot: true,
            nodir: true,
          });

          for (const file of storybookFiles) {
            const srcFile = path.join(sourceStorybookDir, file);
            const destFile = path.join(storybookDir, file);
            
            ensureDirSync(path.dirname(destFile));
            copyFileSync(srcFile, destFile);
            
            // Fix imports if needed
            if (destFile.endsWith('.ts') || destFile.endsWith('.js')) {
              fixImportPaths(destFile);
            }
          }
          
          spinner.succeed('UIBIN initialized with Storybook configuration!');
        } catch (error) {
          spinner.warn('Failed to set up Storybook configuration');
          console.error(error);
        }
      } else {
        spinner.succeed('UIBIN initialized successfully!');
      }
      
      console.log(kleur.green('\nInitialization complete! ✨'));
      console.log(kleur.blue('\nNext steps:'));
      console.log(kleur.white('1. Add components:'));
      console.log(kleur.white('   $ uibin add all            # Add all components'));
      console.log(kleur.white('   $ uibin add                # Select components interactively'));
      console.log(kleur.white('   $ uibin add ThemeProvider  # Add a specific component'));
      console.log(kleur.blue('\n2. Add the ThemeProvider to your root layout.'));
      
    } catch (error) {
      console.error(kleur.red('\nError initializing UIBIN:'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse(process.argv); 