import * as SolidIcons from '@heroicons/react/solid';
import * as OutlineIcons from '@heroicons/react/outline';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface Props {
  icon: IconName;
  className?: string;
  outline?: boolean;
}

export const HeroIcon = (props: Props): JSX.Element => {
  const { icon, className = 'text-white h-8 w-8', outline = true } = props;

  const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];

  return <Icon className={className} />;
};