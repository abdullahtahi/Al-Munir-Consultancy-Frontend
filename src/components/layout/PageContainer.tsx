import Breadcrumb from '@layouts/full/shared/breadcrumb/Breadcrumb';
import { Box, Slide } from '@mui/material';
import React, { ReactNode } from 'react';
import { BreadcrumbItem } from 'src/types/apps/Breadcrumb';
import PageHeader from './PageHeader';

interface PageContainerProps {
  heading?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  heading,
  breadcrumbs,
  action,
  children,
  className = '',
}) => {
  return (
    <Slide in direction="down" mountOnEnter unmountOnExit>
      <Box width="100%" className={className}>
        {(heading || breadcrumbs) && (
          <PageHeader
            heading={heading}
            action={action}
            breadcrumbComponent={
              breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : undefined
            }
          />
        )}
        {children}
      </Box>
    </Slide>
  );
};

export default PageContainer;
