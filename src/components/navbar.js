import { Flex, Switch, Icon } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaSun, FaMoon } from 'react-icons/fa'

const Navbar = ({ setShallowInput, shallowInput }) => {
    let { toggleColorMode, colorMode } = ColorModeSwitcher()

    return (
        <Flex w={['90%', '90%', '95%']} h='10vh' alignItems='center' alignSelf='center' justify='flex-end' right='8' top='6' role='navigation'>
            <Flex alignItems='center' fontSize='14px' mr='25px' display={['none', 'none', 'flex']}>
                Disable shadow input
                <Switch ml='10px' onChange={e => setShallowInput(!shallowInput)} value={shallowInput} />
            </Flex>
            <Icon role='switch' as={colorMode === 'dark' ? FaMoon : FaSun} boxSize={6} onClick={toggleColorMode} cursor='pointer' />
        </Flex>
    );
}

export default Navbar;