import { Heading, HStack, Box, Image, VStack, Text, Spacer } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import React from 'react'

function Details({ room }) {
    return (
        <HStack w="80%" p="16" alignItems='stretch'>

            <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden" ml="4">
                <Image
                    fit="contain"
                    backgroundColor="transparent"
                    borderRadius="lg"
                    objectFit="cover"
                    src={room.img}
                    alt={room.name}
                />

            </Box>
            <Spacer />
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

                <Text p="4">{room.description}</Text>

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
    )
}

export default Details
