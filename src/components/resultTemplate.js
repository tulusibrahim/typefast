import { Flex } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const ResultTemplate = ({ wpm, accuracy, rightWords, wrongWords, totalCharacter }) => {
    let { textColor, cardResultShadow, cardResultBg } = ColorModeSwitcher()

    return (
        <Flex w={['70%', '70%', '20%']} h='fit-content' display={wpm ? 'flex' : 'none'} bg={cardResultBg} boxShadow={`0px 0px 7px 0px ${cardResultShadow}`} transitionDuration='.3s' color={textColor} justify='center' borderRadius='10px' py='10px' direction='column' role='group'>
            <Flex w='100%' justify='center' mb='10px'>
                <Flex fontWeight='bold' letterSpacing='1px' fontSize='2xl'>{wpm.toFixed(0)} WPM</Flex>
            </Flex>
            <Flex w='100%' direction='column' alignItems='center' justify='center'>
                <Flex w='80%' justify='space-between' my='3px'>
                    <Flex w='fit-content' minW='35%' justify='center' fontWeight='bold'>{accuracy.toFixed(2)} %</Flex>
                    <Flex>Accuracy</Flex>
                </Flex>
                <Flex w='80%' justify='space-between' my='3px'>
                    <Flex w='35%' justify='center' fontWeight='bold'>{rightWords}</Flex>
                    <Flex>Correct Words</Flex>
                </Flex>
                <Flex w='80%' justify='space-between' my='3px'>
                    <Flex w='35%' justify='center' fontWeight='bold'>{wrongWords}</Flex>
                    <Flex>Wrong words</Flex>
                </Flex>
                <Flex w='80%' justify='space-between' my='3px'>
                    <Flex w='35%' justify='center' fontWeight='bold'>{totalCharacter}</Flex>
                    <Flex>Keystrokes</Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default ResultTemplate