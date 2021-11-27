import React from 'react';
import * as SolidIcons from '@heroicons/react/solid';
import * as OutlineIcons from '@heroicons/react/outline';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface IconProps {
  icon: IconName;
  className?: string;
  outline?: boolean;
}

class HeroIcon extends React.Component<IconProps> {
  public render(): React.ReactNode {
    const { icon, className = 'text-white h-8 w-8', outline = true } = this.props;
    const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];
    return (
      <Icon className={className} />
    );
  }
}

export default HeroIcon;