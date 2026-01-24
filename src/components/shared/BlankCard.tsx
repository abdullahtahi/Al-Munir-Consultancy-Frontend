import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

type Props = {
  className?: string;
  children: any | any[];
  sx?: any;
};

const BlankCard = ({ children, className, sx }: Props) => {
  const isCardShadow = useSelector(
    (state: RootState) => state.themeCustomizer.isCardShadow
  );
  const theme = useTheme();
  const borderColor = theme.palette.grey[200];

  return (
    <Card
      sx={{
        p: 0,
        border: !isCardShadow ? `1px solid ${borderColor}` : 'none',
        position: 'relative',
        sx,
      }}
      className={className}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
