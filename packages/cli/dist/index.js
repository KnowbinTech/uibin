#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import ora from "ora";
import kleur from "kleur";
import { glob } from "glob";
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
function copyFileSync2(src, dest) {
  ensureDirSync(path.dirname(dest));
  fs.copyFileSync(src, dest);
}
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var templatesDir = path.resolve(__dirname, "..", "templates");
var program = new Command();
program.name("uibin").description("CLI to add UIBIN UI components to your project").version("0.0.5");
program.command("add").description("Add a component to your project").argument("[component]", "Component to add").option("-y, --yes", "Skip confirmation prompt", false).action(async (component, options) => {
  try {
    const availableComponents = ["ThemeProvider", "ThemeToggle"];
    const selectedComponent = component ? component : (await prompts({
      type: "select",
      name: "component",
      message: "Which component would you like to add?",
      choices: availableComponents.map((comp) => ({
        title: comp,
        value: comp
      }))
    })).component;
    if (!selectedComponent) {
      console.log(kleur.yellow("No component selected, exiting..."));
      return;
    }
    if (!availableComponents.includes(selectedComponent)) {
      console.log(
        kleur.red(`Component "${selectedComponent}" not found. Available components: ${availableComponents.join(", ")}`)
      );
      return;
    }
    const targetLibDir = path.resolve(process.cwd(), "src", "lib");
    const targetComponentsDir = path.resolve(targetLibDir, "components", "uibin");
    ensureDirSync(targetComponentsDir);
    const sourceComponentDir = path.resolve(
      templatesDir,
      "components",
      selectedComponent
    );
    if (!fs.existsSync(sourceComponentDir)) {
      console.log(
        kleur.red(`Component template not found at: ${sourceComponentDir}`)
      );
      return;
    }
    if (!options.yes) {
      const { confirmed } = await prompts({
        type: "confirm",
        name: "confirmed",
        message: `Add ${selectedComponent} to ${targetComponentsDir}?`,
        initial: true
      });
      if (!confirmed) {
        console.log(kleur.yellow("Installation cancelled."));
        return;
      }
    }
    const componentFiles = await glob("**/*", {
      cwd: sourceComponentDir,
      dot: true,
      nodir: true
    });
    const spinner = ora(`Adding ${selectedComponent}...`).start();
    const targetComponentDir = path.resolve(targetComponentsDir, selectedComponent);
    ensureDirSync(targetComponentDir);
    for (const file of componentFiles) {
      const srcFile = path.join(sourceComponentDir, file);
      const destFile = path.join(targetComponentDir, file);
      ensureDirSync(path.dirname(destFile));
      copyFileSync2(srcFile, destFile);
    }
    if (selectedComponent === "ThemeProvider") {
      const themeDir = path.resolve(targetLibDir, "theme");
      ensureDirSync(themeDir);
      const sourceThemeDir = path.resolve(templatesDir, "theme");
      const themeFiles = await glob("**/*", {
        cwd: sourceThemeDir,
        dot: true,
        nodir: true
      });
      for (const file of themeFiles) {
        const srcFile = path.join(sourceThemeDir, file);
        const destFile = path.join(themeDir, file);
        ensureDirSync(path.dirname(destFile));
        copyFileSync2(srcFile, destFile);
      }
      const typesDir = path.resolve(targetLibDir, "types");
      ensureDirSync(typesDir);
      const sourceTypesDir = path.resolve(templatesDir, "types");
      copyFileSync2(
        path.join(sourceTypesDir, "theme.ts"),
        path.join(typesDir, "theme.ts")
      );
      if (selectedComponent === "ThemeProvider") {
        const utilsDir = path.resolve(targetLibDir, "utils");
        ensureDirSync(utilsDir);
        const sourceUtilsDir = path.resolve(templatesDir, "utils");
        copyFileSync2(
          path.join(sourceUtilsDir, "deepMerge.ts"),
          path.join(utilsDir, "deepMerge.ts")
        );
      }
      if (selectedComponent === "ThemeProvider" || selectedComponent === "ThemeToggle") {
        const hooksDir = path.resolve(targetLibDir, "hooks");
        ensureDirSync(hooksDir);
        const sourceHooksDir = path.resolve(templatesDir, "hooks");
        copyFileSync2(
          path.join(sourceHooksDir, "useTheme.ts"),
          path.join(hooksDir, "useTheme.ts")
        );
      }
    }
    spinner.succeed(`${selectedComponent} added to ${targetComponentsDir}`);
    if (selectedComponent === "ThemeProvider") {
      const cssPath = path.resolve(process.cwd(), "src", "app.css");
      const sourceThemeCss = path.resolve(templatesDir, "app", "styles.css");
      if (fs.existsSync(cssPath)) {
        console.log(kleur.yellow(`
Found existing app.css file. Please ensure it includes Tailwind 4 theme configuration.`));
        console.log(kleur.blue(`You can copy the theme configuration from: ${sourceThemeCss}`));
      } else {
        copyFileSync2(sourceThemeCss, cssPath);
        console.log(kleur.green(`
Created app.css with theme configuration.`));
      }
    }
    console.log(kleur.green("\nComponent added successfully! \u2728"));
    console.log(kleur.blue("You can now import it in your project:"));
    console.log(kleur.white(`
import { ${selectedComponent} } from '$lib/components/uibin/${selectedComponent}';`));
    if (selectedComponent === "ThemeProvider") {
      console.log(kleur.blue("\nAdd the ThemeProvider to your root layout:"));
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
    console.error(kleur.red("\nError adding component:"));
    console.error(error);
    process.exit(1);
  }
});
program.command("init").description("Initialize UIBIN in your project").option("-y, --yes", "Skip confirmation prompt", false).action(async (options) => {
  try {
    if (!options.yes) {
      const { confirmed } = await prompts({
        type: "confirm",
        name: "confirmed",
        message: "This will set up UIBIN in your project. Continue?",
        initial: true
      });
      if (!confirmed) {
        console.log(kleur.yellow("Initialization cancelled."));
        return;
      }
    }
    const spinner = ora("Setting up UIBIN in your project...").start();
    const libDir = path.resolve(process.cwd(), "src", "lib");
    const componentsDir = path.resolve(libDir, "components");
    const uibinDir = path.resolve(componentsDir, "uibin");
    ensureDirSync(uibinDir);
    const sourceThemeCss = path.resolve(templatesDir, "app", "styles.css");
    const appCssPath = path.resolve(process.cwd(), "src", "app.css");
    copyFileSync2(sourceThemeCss, appCssPath);
    spinner.succeed("UIBIN initialized successfully!");
    console.log(kleur.green("\nInitialization complete! \u2728"));
    console.log(kleur.blue("\nNext steps:"));
    console.log(kleur.white("1. Add the base components:"));
    console.log(kleur.white("   $ uibin add ThemeProvider"));
    console.log(kleur.white("   $ uibin add ThemeToggle"));
    console.log(kleur.blue("\n2. Add the ThemeProvider to your root layout."));
  } catch (error) {
    console.error(kleur.red("\nError initializing UIBIN:"));
    console.error(error);
    process.exit(1);
  }
});
program.parse(process.argv);
