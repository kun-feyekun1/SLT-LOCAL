import { forwardRef, memo, type ReactElement, type ReactNode } from "react";
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { cn } from "@/lib/cn";

export const BADGE_TONES = [
  "primary",
  "success",
  "warning",
  "error",
  "info",
  "neutral",
] as const;

export type BadgeTone = (typeof BADGE_TONES)[number];

export const BADGE_VARIANTS = ["soft", "solid", "outline"] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const BADGE_SIZES = ["sm", "md", "lg"] as const;

export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps extends Omit<ViewProps, "children" | "style"> {
  /**
   * Text displayed inside the badge.
   */
  label: string;

  /**
   * Semantic color of the badge.
   *
   * @default "primary"
   */
  tone?: BadgeTone;

  /**
   * Visual appearance of the badge.
   *
   * @default "soft"
   */
  variant?: BadgeVariant;

  /**
   * Controls badge dimensions and typography.
   *
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Optional content displayed before the label.
   */
  leftElement?: ReactNode;

  /**
   * Optional content displayed after the label.
   */
  rightElement?: ReactNode;

  /**
   * Limits the label to one line by default.
   *
   * @default 1
   */
  numberOfLines?: number;

  /**
   * Allows the label to shrink when space is limited.
   *
   * @default true
   */
  shrinkLabel?: boolean;

  /**
   * Enables or disables system font scaling.
   *
   * @default true
   */
  allowFontScaling?: boolean;

  /**
   * Maximum font scaling multiplier.
   *
   * @default 1.4
   */
  maxFontSizeMultiplier?: number;

  /**
   * Additional NativeWind classes for the badge container.
   */
  className?: string;

  /**
   * Additional NativeWind classes for the badge label.
   */
  textClassName?: string;

  /**
   * Additional React Native styles for the badge container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional React Native styles for the badge label.
   */
  textStyle?: StyleProp<TextStyle>;
}

interface BadgeToneStyle {
  container: string;
  text: string;
}

type BadgeToneStyles = Record<BadgeTone, Record<BadgeVariant, BadgeToneStyle>>;

interface BadgeSizeStyle {
  container: string;
  text: string;
  gap: string;
}

const toneStyles: BadgeToneStyles = {
  primary: {
    soft: {
      container: "border-transparent bg-primary-100 dark:bg-primary-950/70",
      text: "text-primary-700 dark:text-primary-300",
    },
    solid: {
      container: "border-transparent bg-primary-600",
      text: "text-white",
    },
    outline: {
      container: "border-primary-500 bg-transparent dark:border-primary-400",
      text: "text-primary-700 dark:text-primary-300",
    },
  },

  success: {
    soft: {
      container: "border-transparent bg-success-100 dark:bg-success-950/70",
      text: "text-success-700 dark:text-success-300",
    },
    solid: {
      container: "border-transparent bg-success-600",
      text: "text-white",
    },
    outline: {
      container: "border-success-500 bg-transparent dark:border-success-400",
      text: "text-success-700 dark:text-success-300",
    },
  },

  warning: {
    soft: {
      container: "border-transparent bg-warning-100 dark:bg-warning-950/70",
      text: "text-warning-800 dark:text-warning-300",
    },
    solid: {
      container: "border-transparent bg-warning-500",
      text: "text-neutral-950",
    },
    outline: {
      container: "border-warning-500 bg-transparent dark:border-warning-400",
      text: "text-warning-800 dark:text-warning-300",
    },
  },

  error: {
    soft: {
      container: "border-transparent bg-error-100 dark:bg-error-950/70",
      text: "text-error-700 dark:text-error-300",
    },
    solid: {
      container: "border-transparent bg-error-600",
      text: "text-white",
    },
    outline: {
      container: "border-error-500 bg-transparent dark:border-error-400",
      text: "text-error-700 dark:text-error-300",
    },
  },

  info: {
    soft: {
      container: "border-transparent bg-info-100 dark:bg-info-950/70",
      text: "text-info-700 dark:text-info-300",
    },
    solid: {
      container: "border-transparent bg-info-600",
      text: "text-white",
    },
    outline: {
      container: "border-info-500 bg-transparent dark:border-info-400",
      text: "text-info-700 dark:text-info-300",
    },
  },

  neutral: {
    soft: {
      container: "border-transparent bg-neutral-200 dark:bg-neutral-800",
      text: "text-neutral-700 dark:text-neutral-300",
    },
    solid: {
      container: "border-transparent bg-neutral-700 dark:bg-neutral-200",
      text: "text-white dark:text-neutral-950",
    },
    outline: {
      container: "border-neutral-400 bg-transparent dark:border-neutral-600",
      text: "text-neutral-700 dark:text-neutral-300",
    },
  },
};

const sizeStyles: Record<BadgeSize, BadgeSizeStyle> = {
  sm: {
    container: "min-h-5 px-2 py-0.5",
    text: "text-[11px] leading-[14px]",
    gap: "gap-1",
  },

  md: {
    container: "min-h-6 px-2.5 py-1",
    text: "text-xs leading-4",
    gap: "gap-1",
  },

  lg: {
    container: "min-h-7 px-3 py-1.5",
    text: "text-sm leading-[18px]",
    gap: "gap-1.5",
  },
};

const BadgeComponent = forwardRef<View, BadgeProps>(
  (
    {
      label,
      tone = "primary",
      variant = "soft",
      size = "md",
      leftElement,
      rightElement,
      numberOfLines = 1,
      shrinkLabel = true,
      allowFontScaling = true,
      maxFontSizeMultiplier = 1.4,
      className,
      textClassName,
      style,
      textStyle,
      accessibilityLabel,
      accessible = true,
      testID,
      ...viewProps
    },
    ref
  ): ReactElement => {
    const selectedTone = toneStyles[tone][variant];
    const selectedSize = sizeStyles[size];

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole="text"
        accessibilityLabel={accessibilityLabel ?? label}
        testID={testID}
        className={cn(
          "self-start flex-row items-center justify-center",
          "rounded-full border",
          selectedTone.container,
          selectedSize.container,
          selectedSize.gap,
          className
        )}
        style={style}
        {...viewProps}
      >
        {leftElement ? (
          <View
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
            className="shrink-0 items-center justify-center"
          >
            {leftElement}
          </View>
        ) : null}

        <Text
          allowFontScaling={allowFontScaling}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          numberOfLines={numberOfLines}
          ellipsizeMode="tail"
          className={cn(
            "font-inter-medium",
            shrinkLabel && "shrink",
            selectedTone.text,
            selectedSize.text,
            textClassName
          )}
          style={textStyle}
        >
          {label}
        </Text>

        {rightElement ? (
          <View
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
            className="shrink-0 items-center justify-center"
          >
            {rightElement}
          </View>
        ) : null}
      </View>
    );
  }
);

BadgeComponent.displayName = "Badge";

export const Badge = memo(BadgeComponent);

export default Badge;
