import { Flex, Icon, Input } from "@chakra-ui/react";
import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
import { BsArrowRepeat } from 'react-icons/bs'
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const InputComponent = ({ borderColor, input, keyboardChange, setInput, disableKeyboard, words, wordIndex, shallowInput, timer, setTimer, start, setdisableKeyboard, repeatTest }) => {
    let { textColor, colorMode } = ColorModeSwitcher()

    return (
        <Flex w='100%' h='20vh' justify='center' alignItems='center'>
            <Flex h='25%' w={['90%', '90%', '45%']} pos='relative' alignItems='center'>
                <Input w={['80%', '80%', '90%']} type='text' variant='flushed' color={textColor} borderBottomColor={borderColor ? borderColor : 'blue.300'} borderBottomWidth='2px' zIndex={2} _focus={{ borderBottomColor: 'none' }} value={input} onKeyUp={keyboardChange} onChange={e => setInput(e.target.value)} disabled={disableKeyboard} role='textbox' />
                <Input w={['80%', '80%', '90%']} type='text' variant='flushed' color={colorMode === 'dark' ? 'whiteAlpha.400' : 'blackAlpha.600'} pos='absolute' value={input?.substring(0, input?.length) === words[wordIndex]?.substring(0, input.length) ? words[wordIndex] : ''} zIndex={1} display={shallowInput ? 'none' : 'block'} disabled />
                <Flex w={['20%', '20%', '10%']} display={timer === 0 ? 'none' : 'flex'} direction='column' pos='absolute' right={0} h='fit-content' alignItems='center' justify='center'  >
                    <Icon as={CgChevronUp} color={textColor} my='2px' cursor='pointer' _hover={{ transform: 'scale(1.3)' }} transitionDuration='.2s' onClick={() => setTimer(timer + 60)} display={!start ? 'block' : 'none'} title="Add timer" />
                    <Flex w='100%' justify='center' alignItems='center' textAlign='center' userSelect='none' flexDir='column'>{timer}</Flex>
                    <Icon as={CgChevronDown} color={textColor} my='2px' cursor='pointer' _hover={{ transform: 'scale(1.3)' }} transitionDuration='.2s' onClick={() => { timer > 60 && setTimer(timer - 60); setdisableKeyboard(false) }} display={!start ? 'block' : 'none'} title="Subs timer" />
                </Flex>
                <Flex display={timer === 0 ? 'flex' : 'none'} w={['20%', '20%', '10%']} h='100%' alignItems='center' color='white' justify='center'>
                    <Icon as={BsArrowRepeat} color={textColor} boxSize={6} cursor='pointer' _hover={{ transform: 'scale(1.15)' }} transitionDuration='.2s' onClick={() => repeatTest()} title='Repeat' />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default InputComponent;