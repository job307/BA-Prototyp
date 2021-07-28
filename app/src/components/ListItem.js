import React, {useContext} from 'react'
import { useService } from '@xstate/react';
import { HStack, VStack, StackDivider, Heading, Image, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa'
import { PrefContext } from '../App';


function ListItem({rooms}) {

    const service = useContext(PrefContext);
    const [state, send] = useService(service);

    if (state.context.totalHits >= 10 && (state.context.poolHits / state.context.totalHits) >= 0.4) {
        rooms.sort((x,y) => y.pool - x.pool)
    }

    return (
        <VStack
            divider={<StackDivider />}
            borderColor='gray.100'
            borderWidth='2px'
            p='4'
            borderRadius='lg'
            w='100%'
            maxW={{ base: '90vw', sm: '80vw', lg: '65vw', xl: '50vw' }}
            alignItems='stretch'
        >

            {rooms.map(room => (
                <form onClick={() => send('HIT', {hitId: room.id, poolHit: room.pool})} >
                    <HStack key={room.id}>

                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" ml="4">
                            <Image
                                fit="contain"
                                backgroundColor="transparent"
                                borderRadius="lg"
                                objectFit="cover"
                                src={room.img}
                                alt={room.name}
                            />

                        </Box>
                        <VStack w="100%">
                            <Heading>
                                {room.name}
                            </Heading>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                {room.betten} Bett{room.betten >= '2' ? "en" : ""} &bull; {room.badezimmer} Badezimmer
                            </Box>

                            <Box>
                                {room.preis}
                                <Box as="span" color="gray.600" fontSize="sm">
                                    / Woche
                                </Box>
                            </Box>

                            <Box d="flex" mt="2" alignItems="center">
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <FaStar
                                            style={{ color: i < room.stars ? "#319795" : "#CBD5E0" }}
                                        />
                                    ))}
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                    {room.reviews} ratings
                                </Box>
                            </Box>
                        </VStack>
                    </HStack>

                </form>

            ))}
        </VStack>

    )
}

export default ListItem
