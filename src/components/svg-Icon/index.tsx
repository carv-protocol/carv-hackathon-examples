import { Box, SxProps } from '@mui/material';
import './index.css';

interface Prop {
  icon: string;
  color?: string;
  prefix?: string;
  alt?: string;
  className?: string;
  sx?: SxProps;
  style?: object;
}

const SvgIcon = ({
  prefix = 'icon',
  icon,
  color = '',
  className = '',
  sx = {},
  style = {},
  ...rest
}: Prop) => {
  const symbolId = `#${prefix}-${icon}`;
  const isOnlineSvg = /^(https?:)/.test(icon);

  return (
    <Box
      className={
        'svg-icon' +
        (isOnlineSvg ? ` is_online` : '') +
        (className ? ` ${className}` : '')
      }
      sx={sx}
      style={style}
    >
      {isOnlineSvg ? (
        <img src={icon} {...rest} />
      ) : (
        <svg aria-hidden="true" {...rest}>
          <use xlinkHref={symbolId} fill={color} />
        </svg>
      )}
    </Box>
  );
};

export default SvgIcon;
