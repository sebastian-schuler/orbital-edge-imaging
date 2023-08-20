import { Group, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Brand logo, used in nav and footer
 */
const PageLogo = () => {

    return (
        <Link href={'/'}>
            <Group>
                <Image src='/images/logo.png' alt='Orbital Edge Imaging Logo' width={32} height={32} />
                <Text component='h1' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text component='span' color='primaryRed.4' lh={1}>Orbital Edge</Text>
                    <Text component='span' color='primaryBlue.4' lh={1}>Imaging</Text>
                </Text>
            </Group>
        </Link>
    )
}

export default PageLogo