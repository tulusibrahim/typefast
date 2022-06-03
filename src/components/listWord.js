import { Flex } from "@chakra-ui/react";
import WordTemplate from "./wordTemplate";

const ListWord = ({ words, limitDown, limitUp, wordIndex, allInputtedWords }) => {
    return (
        <Flex w={['95%', '95%', '46%']} h='fit-content' my='1rem' wrap='wrap' justify='flex-start'>
            {
                words.map((i, id) => id <= limitUp && id >= limitDown && <WordTemplate word={i} id={id} wordIndex={wordIndex} allInputtedWords={allInputtedWords} words={words} />)
            }
        </Flex>
    );
}

export default ListWord;