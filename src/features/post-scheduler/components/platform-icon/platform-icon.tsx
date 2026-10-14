import { cn } from 'cn';
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import type { PlatformIconProps } from '../../types/post';

const WRAPPER = 'inline-flex size-10 shrink-0 items-center justify-center';

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  switch (platform) {
    case 'x':
      return (
        <span className={cn(WRAPPER, 'rounded-full bg-black text-white', className)}>
          <FaXTwitter className="size-[50%]" aria-hidden />
        </span>
      );
    case 'tiktok':
      return (
        <span className={cn(WRAPPER, 'rounded-full bg-black text-white', className)}>
          <FaTiktok className="size-[50%]" aria-hidden />
        </span>
      );
    case 'facebook':
      return (
        <span className={cn(WRAPPER, 'rounded-full bg-white text-[#1877f2]', className)}>
          <FaFacebook className="size-full" aria-hidden />
        </span>
      );
    case 'instagram':
      return (
        <span
          className={cn(
            WRAPPER,
            'rounded-xl bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white',
            className,
          )}
        >
          <FaInstagram className="size-[60%]" aria-hidden />
        </span>
      );
  }
}
