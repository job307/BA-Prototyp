import { HStack, IconButton, Input, StackDivider, Text, VStack, Stack } from '@chakra-ui/react'
import { useService } from '@xstate/react';
import { FaSearch } from 'react-icons/fa'
import { PrefContext } from '../App';
import {useContext, useState} from 'react'

function UserPrefs({wo, beginn, ende, wer}) {

    const service = useContext(PrefContext);
    const [state, send] = useService(service);
    const [where, setWhere] = useState(wo );
    const [start, setStart] = useState(beginn);
    const [end, setEnd] = useState(ende);
    const [who, setWho] = useState(wer);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        send({type: 'SET_PREFS', where: where, start: start, end: end, who: who })
        console.log(state.context.where)
        send({type: 'SELECTED'})
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack divider={<StackDivider />} borderColor='gray.200' borderWidth='2px' borderRadius="full" mt="8" mb="16">
                <VStack p="2">
                    <Text as="b">Ort</Text>
                    <Input type="text" value={where} onChange={(e) => setWhere(e.target.value)} variant="unstyled" placeholder="Wo hin?" textAlign="center"></Input>
                </VStack>

                <VStack p="2">
                    <Text as="b">Check-in</Text>
                    <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} variant="unstyled" placeholder="Wann?" textAlign="center"></Input>
                </VStack>
                
                <VStack p="2">
                    <Text as="b">Check-out</Text>
                    <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} variant="unstyled" placeholder="Wann?" textAlign="center"></Input>
                </VStack>

                <VStack p="2">
                    <Text as="b">Wer</Text>
                    <Input type="text" value={who} onChange={(e) => setWho(e.target.value)} variant="unstyled" placeholder="Wer?" textAlign="center"></Input>
                </VStack>

                <Stack p="2" ml="-2">
                    <IconButton icon={<FaSearch />} isRound="true" size="lg" type="submit" />
                </Stack>
            </HStack>
        </form>
    )
}

export default UserPrefs
