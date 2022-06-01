import { Flex } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const WordTemplate = ({ word, id, wordIndex }) => {
    let { colorMode } = ColorModeSwitcher()

    return (
        <Flex
            px='10px'
            py='5px'
            fontSize={['1.1rem', '1.3rem', '1.5rem']}
            bg={wordIndex === id ?
                colorMode === 'dark' ? 'gray.900'
                    : 'whiteAlpha.700'
                : ''}
            borderRadius='10px'
            mr='10px'
            mb='10px'
        >
            {word}
        </Flex>
    )
}
export default WordTemplate