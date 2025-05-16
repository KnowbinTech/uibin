<script lang="ts">
  import { 
    Box,
    Button,
    ButtonGroup,
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter,
    Checkbox,
    Container,
    Divider,
    Grid,
    Radio,
    RadioGroup,
    RadioItem,
    Select,
    Slider,
    Stack,
    Switch,
    TextArea,
    TextField,
    ThemeDemo,
    ThemeProvider,
    ThemeToggle,
    DatePicker,
    useTheme,
    forceThemeUpdate
  } from '$lib/index.js';
  
  // Access theme context to ensure proper theme application
  const { mode } = useTheme();
  let currentTheme = $state('light');
  
  // Subscribe to theme changes
  $effect(() => {
    const unsubscribe = mode.subscribe((value: 'light' | 'dark') => {
      currentTheme = value;
      
      // Force update all themed elements when theme changes
      // Small delay to ensure DOM is updated first
      setTimeout(() => {
        forceThemeUpdate();
      }, 50);
    });
    
    return () => unsubscribe();
  });
</script>

<div class="py-10 bg-background text-foreground">
  <Container>
    <div class="space-y-10">
      <!-- Theme Demo at the top for reference -->
      <ThemeDemo class="mb-8" />
      <div>
        <h1 class="text-3xl font-bold mb-6">UIBIN Component Library Documentation</h1>
        <p class="text-lg text-muted-foreground mb-4">
          A modern, accessible component library for Svelte applications.
        </p>
        <div class="flex items-center gap-3 mb-6">
          <span class="font-medium">Current theme:</span>
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
            {currentTheme}
          </span>
          <ThemeToggle size={18} class="ml-2" />
        </div>
        <Divider />
      </div>

      <!-- Layout Components -->
      <section id="layout-components" class="space-y-6">
        <h2 class="text-2xl font-semibold">Layout Components</h2>
        
        <!-- Box -->
        <Card id="box">
          <CardHeader>
            <CardTitle>Box</CardTitle>
            <CardDescription>A fundamental layout component for creating UI elements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Box component is a foundational layout primitive that can be used to build other UI components.</p>
              
              <div class="space-y-2">
                <h4 class="text-sm font-medium">Example:</h4>
                <Box class="p-4 bg-muted rounded-md">
                  This is a Box component with custom styling
                </Box>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Container -->
        <Card id="container">
          <CardHeader>
            <CardTitle>Container</CardTitle>
            <CardDescription>A component for containing content with responsive max-width.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Container component centers content horizontally and applies a max-width at different breakpoints.</p>
              
              <div class="space-y-2">
                <h4 class="text-sm font-medium">Example:</h4>
                <div class="border border-border bg-muted/30 p-2 rounded-md">
                  <Box class="bg-muted p-4 rounded-md">
                    Content inside a container (this page uses Container)
                  </Box>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Grid -->
        <Card id="grid">
          <CardHeader>
            <CardTitle>Grid</CardTitle>
            <CardDescription>A powerful grid layout component with responsive support.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Grid component provides a flexible CSS grid layout system.</p>
              
              <div class="space-y-2">
                <h4 class="text-sm font-medium">Example:</h4>
                <Grid cols={3} gap={4}>
                  <Box class="p-4 bg-muted rounded-md text-center">1</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">2</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">3</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">4</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">5</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">6</Box>
                </Grid>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Stack -->
        <Card id="stack">
          <CardHeader>
            <CardTitle>Stack</CardTitle>
            <CardDescription>A component for creating consistent vertical or horizontal spacing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Stack component creates consistent spacing between child elements.</p>
              
              <div class="space-y-2">
                <h4 class="text-sm font-medium">Vertical Stack:</h4>
                <Stack direction="vertical" space={4}>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 1</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 2</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 3</Box>
                </Stack>
                
                <h4 class="text-sm font-medium mt-4">Horizontal Stack:</h4>
                <Stack direction="horizontal" space={4}>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 1</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 2</Box>
                  <Box class="p-4 bg-muted rounded-md text-center">Item 3</Box>
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Divider withLabel>UI Components</Divider>
      
      <!-- UI Components -->
      <section id="ui-components" class="space-y-6">
        
        <!-- Button -->
        <Card id="button">
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Interactive button component with various styles and states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Button component provides clickable elements with different variants, sizes, and states.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Variants:</h4>
                <Stack direction="horizontal" space={4}>
                  <Button variant="default" text="Default" />
                  <Button variant="primary" text="Primary" />
                  <Button variant="secondary" text="Secondary" />
                  <Button variant="outline" text="Outline" />
                  <Button variant="ghost" text="Ghost" />
                </Stack>

                <h4 class="text-sm font-medium">Sizes:</h4>
                <Stack direction="horizontal" space={4} align="center">
                  <Button size="sm" text="Small" />
                  <Button size="md" text="Medium" />
                  <Button size="lg" text="Large" />
                </Stack>

                <h4 class="text-sm font-medium">States:</h4>
                <Stack direction="horizontal" space={4}>
                  <Button loading text="Loading" />
                  <Button disabled text="Disabled" />
                  <Button fullWidth text="Full Width" />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- ButtonGroup -->
        <Card id="button-group">
          <CardHeader>
            <CardTitle>ButtonGroup</CardTitle>
            <CardDescription>Group related buttons together with consistent spacing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The ButtonGroup component organizes related buttons with consistent alignment and spacing.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Horizontal Group:</h4>
                <ButtonGroup>
                  <Button text="Button 1" />
                  <Button text="Button 2" />
                  <Button text="Button 3" />
                </ButtonGroup>

                <h4 class="text-sm font-medium">Vertical Group:</h4>
                <ButtonGroup direction="vertical" align="stretch">
                  <Button text="Button 1" />
                  <Button text="Button 2" />
                  <Button text="Button 3" />
                </ButtonGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Card -->
        <Card id="card">
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>A container for grouping related content and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Card component provides a flexible container for content with optional header and footer sections.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Example:</h4>
                <Card hover>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is the main content of the card.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" text="Cancel" />
                    <Button class="ml-2" text="Submit" />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Divider -->
        <Card id="divider">
          <CardHeader>
            <CardTitle>Divider</CardTitle>
            <CardDescription>A horizontal or vertical line that separates content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Divider component creates a visual separation between content sections.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Horizontal Divider:</h4>
                <div class="space-y-2">
                  <p>Content above the divider</p>
                  <Divider />
                  <p>Content below the divider</p>
                </div>

                <h4 class="text-sm font-medium">Divider with Label:</h4>
                <Divider withLabel>OR</Divider>

                <h4 class="text-sm font-medium">Vertical Divider:</h4>
                <div class="flex items-center h-20">
                  <div>Left content</div>
                  <Divider orientation="vertical" class="mx-4 h-full" />
                  <div>Right content</div>
                </div>

                <h4 class="text-sm font-medium">Styles:</h4>
                <Stack direction="vertical" space={4}>
                  <Divider style="solid" />
                  <Divider style="dashed" />
                  <Divider style="dotted" />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Divider withLabel>Form Components</Divider>
      
      <!-- Form Components -->
      <section id="form-components" class="space-y-6">
        
        <!-- TextField -->
        <Card id="text-field">
          <CardHeader>
            <CardTitle>TextField</CardTitle>
            <CardDescription>Text input component with various styles and states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The TextField component provides a text input with support for labels, helper text, error messages, and more.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Basic:</h4>
                <TextField label="Username" placeholder="Enter your username" />

                <h4 class="text-sm font-medium">With Helper Text:</h4>
                <TextField 
                  label="Email" 
                  placeholder="Enter your email" 
                  helperText="We'll never share your email with anyone else."
                  type="email"
                />

                <h4 class="text-sm font-medium">With Error:</h4>
                <TextField 
                  label="Password" 
                  placeholder="Enter your password" 
                  type="password"
                  errorMessage="Password must be at least 8 characters long"
                />

                <h4 class="text-sm font-medium">Variants:</h4>
                <Stack direction="vertical" space={4}>
                  <TextField label="Default" placeholder="Default variant" variant="default" />
                  <TextField label="Filled" placeholder="Filled variant" variant="filled" />
                  <TextField label="Outline" placeholder="Outline variant" variant="outline" />
                  <TextField label="Flushed" placeholder="Flushed variant" variant="flushed" />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Checkbox -->
        <Card id="checkbox">
          <CardHeader>
            <CardTitle>Checkbox</CardTitle>
            <CardDescription>Interactive checkbox component for boolean selections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Checkbox component provides a way to select or deselect an option.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Basic:</h4>
                <Checkbox label="Accept terms and conditions" />

                <h4 class="text-sm font-medium">With Helper Text:</h4>
                <Checkbox 
                  label="Subscribe to newsletter" 
                  helperText="You can unsubscribe at any time"
                />

                <h4 class="text-sm font-medium">States:</h4>
                <Stack direction="vertical" space={2}>
                  <Checkbox label="Checked" checked />
                  <Checkbox label="Unchecked" />
                  <Checkbox label="Disabled" disabled />
                  <Checkbox label="Indeterminate" indeterminate />
                </Stack>

                <h4 class="text-sm font-medium">Sizes:</h4>
                <Stack direction="vertical" space={2}>
                  <Checkbox label="Small" size="sm" />
                  <Checkbox label="Medium" size="md" />
                  <Checkbox label="Large" size="lg" />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Radio -->
        <Card id="radio">
          <CardHeader>
            <CardTitle>Radio</CardTitle>
            <CardDescription>Radio buttons for selecting a single option from a group.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Radio component provides a way to select a single option from a group of choices.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Single Radio:</h4>
                <Radio label="Single option" name="single-radio" value="option" />

                <h4 class="text-sm font-medium">Radio Group:</h4>
                <RadioGroup label="Select an option" name="radio-example">
                  <RadioItem value="option1" label="Option 1" />
                  <RadioItem value="option2" label="Option 2" />
                  <RadioItem value="option3" label="Option 3" />
                </RadioGroup>

                <h4 class="text-sm font-medium">Horizontal Radio Group:</h4>
                <RadioGroup label="Select a size" name="size-radio" orientation="horizontal">
                  <RadioItem value="small" label="Small" />
                  <RadioItem value="medium" label="Medium" />
                  <RadioItem value="large" label="Large" />
                </RadioGroup>

                <h4 class="text-sm font-medium">With Error:</h4>
                <RadioGroup 
                  label="Required selection" 
                  name="required-radio"
                  errorMessage="Please select an option"
                  required
                >
                  <RadioItem value="yes" label="Yes" />
                  <RadioItem value="no" label="No" />
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Switch -->
        <Card id="switch">
          <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription>A toggle switch component for binary states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Switch component provides a toggle control for binary options.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Default Switch:</h4>
                <Switch label="Toggle me" />
                
                <h4 class="text-sm font-medium">Colors:</h4>
                <Stack direction="horizontal" space={4}>
                  <Switch label="Primary" color="primary" />
                  <Switch label="Secondary" color="secondary" />
                  <Switch label="Success" color="success" />
                  <Switch label="Warning" color="warning" />
                  <Switch label="Danger" color="danger" />
                </Stack>
                
                <h4 class="text-sm font-medium">Sizes:</h4>
                <Stack direction="horizontal" space={4} align="center">
                  <Switch label="Small" size="sm" />
                  <Switch label="Medium" size="md" />
                  <Switch label="Large" size="lg" />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Select -->
        <Card id="select">
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>A dropdown selection component for choosing from a list of options.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Select component allows users to choose an option from a dropdown list.</p>
              
              <div class="space-y-2">
                <h4 class="text-sm font-medium">Example:</h4>
                <Select 
                  label="Choose an option"
                  items={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]}
                  placeholder="Select an option"
                />
                
                <h4 class="text-sm font-medium mt-4">With Option Groups:</h4>
                <Select 
                  label="Category"
                  items={[
                    { 
                      label: 'Fruits',
                      items: [
                        { value: 'apple', label: 'Apple' },
                        { value: 'banana', label: 'Banana' },
                        { value: 'orange', label: 'Orange' }
                      ]
                    },
                    {
                      label: 'Vegetables',
                      items: [
                        { value: 'carrot', label: 'Carrot' },
                        { value: 'broccoli', label: 'Broccoli' },
                        { value: 'spinach', label: 'Spinach' }
                      ]
                    }
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Slider -->
        <Card id="slider">
          <CardHeader>
            <CardTitle>Slider</CardTitle>
            <CardDescription>A component for selecting values from a range.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The Slider component allows users to select a value or range from a given range by dragging a handle.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Single Slider:</h4>
                <Slider 
                  min={0} 
                  max={100} 
                  value={50} 
                  label="Percentage"
                  showTooltip
                />
                
                <h4 class="text-sm font-medium">Range Slider:</h4>
                <Slider 
                  min={0} 
                  max={1000} 
                  value={200} 
                  endValue={800} 
                  range
                  showTooltip
                />
                
                <h4 class="text-sm font-medium">With Marks:</h4>
                <Slider 
                  min={0} 
                  max={10} 
                  value={5}
                  step={2}
                  marks={[0, 2, 4, 6, 8, 10]}
                  label="Steps of 2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- TextArea -->
        <Card id="text-area">
          <CardHeader>
            <CardTitle>TextArea</CardTitle>
            <CardDescription>A multi-line text input component.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The TextArea component provides a resizable multi-line text input field.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Default TextArea:</h4>
                <TextArea 
                  label="Comments"
                  placeholder="Type your message here..."
                  rows={4}
                />
                
                <h4 class="text-sm font-medium">With Character Counter:</h4>
                <TextArea 
                  label="Limited Text"
                  placeholder="Maximum 100 characters..."
                  maxLength={100}
                  showCount
                  rows={3}
                />
                
                <h4 class="text-sm font-medium">Auto-resize:</h4>
                <TextArea 
                  label="Auto-resize"
                  placeholder="This field will grow as you type..."
                  autoResize
                  maxRows={6}
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- DatePicker -->
        <Card id="date-picker">
          <CardHeader>
            <CardTitle>DatePicker</CardTitle>
            <CardDescription>A component for selecting dates with calendar interface.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The DatePicker component allows users to select dates using an intuitive calendar interface.</p>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium">Default DatePicker:</h4>
                <DatePicker 
                  label="Select Date"
                  placeholder="Choose a date..."
                />
                
                <h4 class="text-sm font-medium">With Min/Max Dates:</h4>
                <DatePicker 
                  label="Limited Range"
                  minDate={new Date(2023, 0, 1)}
                  maxDate={new Date(2023, 11, 31)}
                />
                
                <h4 class="text-sm font-medium">Date Range Selection:</h4>
                <DatePicker 
                  label="Date Range"
                  range
                  rangeSelection
                  placeholder="Select start and end dates"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Divider withLabel>Theme Components</Divider>
      
      <!-- Theme Components -->
      <section id="theme-components" class="space-y-6">
        
        <!-- ThemeProvider -->
        <Card id="theme-provider">
          <CardHeader>
            <CardTitle>ThemeProvider</CardTitle>
            <CardDescription>Context provider for theme settings and dark mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The ThemeProvider component provides theme context to all child components. It manages theme state and preferences.</p>
              
              <div class="p-4 border border-border rounded-md bg-muted/20">
                <p class="text-sm">This component is typically used at the root of your application.</p>
                <pre class="mt-2 p-2 bg-muted rounded-md text-xs overflow-x-auto">
{`<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- ThemeToggle -->
        <Card id="theme-toggle">
          <CardHeader>
            <CardTitle>ThemeToggle</CardTitle>
            <CardDescription>Toggle button for switching between light and dark themes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">The ThemeToggle component provides a button to switch between light and dark themes.</p>
              
              <div class="flex items-center justify-center p-4 border border-border rounded-md">
                <ThemeToggle />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div class="py-10 text-center text-muted-foreground">
        <p>UIBIN Component Library Capsmagick © 2025</p>
      </div>
    </div>
  </Container>
</div> 