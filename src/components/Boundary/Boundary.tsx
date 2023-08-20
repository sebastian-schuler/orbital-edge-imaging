import { Container, ContainerProps } from '@mantine/core';
import React from 'react';
import useStyles from './Boundary.styles';

type Props = {
  children: React.ReactNode
  paddingBottom?: boolean
  paddingTop?: boolean
} & ContainerProps

/**
 * Boundary component, acts as a container for other components, standardizes padding and margins
 */
const Boundary = ({ children, paddingBottom, paddingTop, ...props }: Props) => {

  const { classes, theme } = useStyles();

  return (
    <Container
      h={'100%'}
      size={'xl'}
      className={classes.containerPaddingX}
      sx={{
        paddingTop: paddingTop ? theme.spacing.lg : undefined,
        paddingBottom: paddingBottom ? theme.spacing.lg : undefined,
      }}
      {...props}
    >
      {children}
    </Container>
  )
}

export default Boundary