import Boundary from '@/components/Boundary/Boundary';
import { Button, Text, Title } from '@mantine/core';
import Link from 'next/link';
import useStyles from './SectionHero.styles';

/**
 * Hero section used on index page
 * Template source: https://ui.mantine.dev/category/hero
 */
const SectionHero = () => {
    
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Boundary>
                <div className={classes.inner}>
                    <div className={classes.content}>

                        <Title className={classes.subtitle}>
                            Orbital Edge Imaging
                        </Title>

                        <Title className={classes.title}>
                            Web Map Service
                        </Title>

                        <Text className={classes.description} mt={30}>
                        Search and download satellite imagery with specific filters, timestamps and more...
                        </Text>

                        <Button
                            component={Link}
                            href="/ogc-service"
                            variant="filled"
                            size="lg"
                            className={classes.control}
                            mt={40}
                        >
                            Open OGC App
                        </Button>
                    </div>
                </div>
            </Boundary>
        </div>
    );
}

export default SectionHero