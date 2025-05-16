import type { HTMLAttributes } from 'svelte/elements';

/**
 * Card component props interface
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Whether to apply a hover effect
   * @default false
   */
  hover?: boolean;
  
  /**
   * Whether the card has a border
   * @default true
   */
  bordered?: boolean;
  
  /**
   * Custom padding for the card
   * @default '4'
   */
  padding?: string;
}

/**
 * CardHeader component props interface
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
}

/**
 * CardTitle component props interface
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * HTML tag to use for the title
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

/**
 * CardDescription component props interface
 */
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
}

/**
 * CardContent component props interface
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
}

/**
 * CardFooter component props interface
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
} 