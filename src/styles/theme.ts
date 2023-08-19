import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

const appTheme: MantineThemeOverride = {

    colors: {
        primaryRed: [
            '#E70057',
            '#C9004C',
            '#AF0042',
            '#980039',
            '#840032', // Primary shade
            '#70002A',
            '#5F0024',
            '#51001F',
            '#45001A',
            '#3B0016',
        ],
        primaryBlue: [
            '#004273',
            '#003A64',
            '#003257',
            '#002C4C',
            '#002642', // Primary shade
            '#002038',
            '#001B30',
            '#001729',
            '#001422',
            '#00111D'
        ],
        dark: [
            '#BEC7DA',
            '#435275',
            '#3C4968',
            '#34405B',
            '#2D374E',
            '#252D41',
            '#1E2434',
            '#171c28',
            '#0F121A',
            '#07090D',
        ],
    },
    white: '#F2F4F8',
    black: '#1A1A1A',
    primaryColor: 'primaryRed',
    primaryShade: 4,

    fontFamily: 'roboto, arial, sans-serif',
    fontSizes: {
        xs: '0.75rem',
        sm: '0.85rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.5rem',
    },

    defaultRadius: 'md',

    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
    },

    breakpoints: {
        xs: '36rem',
        sm: '48rem',
        md: '62rem',
        lg: '75rem',
        xl: '87rem',
    },

    components: {
        Paper: {
            defaultProps: {
                withBorder: true,
                px: 'md',
                py: 'sm',
            }
        }
    },

    headings: {
        fontFamily: 'roboto, arial, sans-serif',
        sizes: {
            h1: {
                fontSize: '3.3em',
                fontWeight: 700,
                lineHeight: 1.1,
            },
            h2: {
                fontSize: '2.5em',
                fontWeight: 700,
                lineHeight: 1.1,
            },
            h3: {
                fontSize: '2.0em',
                fontWeight: 700,
                lineHeight: 1.1,
            },
            h4: {
                fontSize: '1.7em',
                fontWeight: 700,
                lineHeight: 1.1,
            },
            h5: {
                fontSize: '1.5em',
                fontWeight: 600,
                lineHeight: 1.1,
            },
            h6: {
                fontSize: '1.3em',
                fontWeight: 500,
                lineHeight: 1.1,
            },
        }
    }
};

type ExtendedCustomColors = 'primaryRed' | 'primaryBlue' | 'dark' | DefaultMantineColor;

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
    }
}

export default appTheme;