/**
 * Animated View Component - SmartLink Transit
 * Pre-configured animated components
 */

import React from 'react';
import { Animated, ViewProps } from 'react-native';
import { cn } from '../../../lib/cn';

interface AnimatedViewProps extends ViewProps {
  /** Fade animation */
  fade?: boolean;
  /** Slide animation */
  slide?: 'up' | 'down' | 'left' | 'right';
  /** Scale animation */
  scale?: boolean;
  /** Shake animation */
  shake?: boolean;
  /** Animation duration */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Additional className */
  className?: string;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  fade = false,
  slide,
  scale = false,
  shake = false,
  duration = 300,
  delay = 0,
  className,
  children,
  ...props
}) => {
  const opacity = React.useRef(new Animated.Value(fade ? 0 : 1)).current;
  const translateX = React.useRef(new Animated.Value(slide === 'left' ? -20 : slide === 'right' ? 20 : 0)).current;
  const translateY = React.useRef(new Animated.Value(slide === 'up' ? 20 : slide === 'down' ? -20 : 0)).current;
  const scaleValue = React.useRef(new Animated.Value(scale ? 0.9 : 1)).current;
  const shakeValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];

    if (fade) {
      animations.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    if (slide) {
      animations.push(
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          speed: 12,
          bounciness: 4,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 12,
          bounciness: 4,
        })
      );
    }

    if (scale) {
      animations.push(
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          speed: 12,
          bounciness: 4,
        })
      );
    }

    if (shake) {
      animations.push(
        Animated.sequence([
          Animated.timing(shakeValue, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeValue, {
            toValue: 10,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(shakeValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      );
    }

    Animated.parallel(animations).start();
  }, []);

  return (
    <Animated.View
      className={cn(className)}
      style={{
        opacity,
        transform: [
          { translateX },
          { translateY },
          { scale: scaleValue },
          ...(shake ? [{ translateX: shakeValue }] : []),
        ],
      }}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;