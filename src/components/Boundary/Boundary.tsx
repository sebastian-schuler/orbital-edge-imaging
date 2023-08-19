import { Container, ContainerProps } from '@mantine/core';
import React from 'react';
import useStyles from './Boundary.styles';

type Props = {
  children: React.ReactNode
  paddingBottom?: boolean
  paddingTop?: boolean
} & ContainerProps

const Boundary = ({ children, paddingBottom, paddingTop, ...props }: Props) => {

  const { classes, theme } = useStyles();

  return (
    <Container
      h={'100%'}
      size={'xl'}
      className={classes.containerPaddingX}
      sx={{
        paddingTop: paddingTop ? theme.spacing.lg : 0,
        paddingBottom: paddingBottom ? theme.spacing.lg : 0,
      }}
      {...props}
    >
      {children}
    </Container>
  )
}

export default Boundary