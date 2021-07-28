import { Heading, VStack, IconButton, useColorMode, HStack, Spacer, Stack, useToast } from '@chakra-ui/react'
import { FaSun, FaMoon, FaHome, FaBackspace } from 'react-icons/fa'
import ListItem from './components/ListItem'
import UserPrefs from './components/UserPrefs'
import { selectPrefsMachine } from './machines/selectPrefsMachine'
import { createContext } from 'react';
import { useMachine } from '@xstate/react';
import Details from './components/Details'

export const PrefContext = createContext();

function App() {
  const rooms = [
    {
      id: '1',
      name: 'Hotelzimmer',
      description: 'Description eins',
      img: 'https://www.waldbauer-holztechnik.de/wp-content/uploads/2019/07/hotelzimmer-typ-almenherz.jpg',
      stars: '3',
      pool: false,
      betten: '1',
      badezimmer: '1',
      preis: '€920,00',
      reviews: '27'
    },
    {
      id: '2',
      name: 'Gastraum',
      description: 'Description eins',
      img: 'https://www.falstaff.ch/fileadmin/_processed_/d/1/csm_AAAlpina-Gstaad-Room--c-beigestellz-2640_56e139101b.jpg',
      stars: '4',
      pool: false,
      betten: '2',
      badezimmer: '1',
      preis: '€980,00',
      reviews: '32'
    },
    {
      id: '3',
      name: 'Villa',
      description: 'Description eins',
      img: 'https://www.holidaytots.co.uk/images_CMS/pimage/767/156353679223_767_main.jpg',
      stars: '5',
      pool: true,
      betten: '4',
      badezimmer: '6',
      preis: '€3.650,00',
      reviews: '43'
    },
    {
      id: '4',
      name: 'Hotelzimmer',
      description: 'Description eins',
      img: 'https://vermietertagebuch.com/wp-content/uploads/2019/05/Untervermietung-bei-Airbnb.jpg',
      stars: '3',
      pool: false,
      betten: '1',
      badezimmer: '1',
      preis: '€1.050,00',
      reviews: '68'
    },
    {
      id: '5',
      name: 'Hotelzimmer',
      description: 'Description eins',
      img: 'https://www.tirol.at/images/ltm9pprb0km-/outdoorpool-im-hotel-kronthaler.jpg',
      stars: '3',
      pool: true,
      betten: '2',
      badezimmer: '2',
      preis: '€850,00',
      reviews: '35'
    },
    {
      id: '6',
      name: 'Wohnung',
      description: 'Description eins',
      img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=810x10000:format=jpg/path/s0e58ba1c709384a1/image/i894dbfd0b39f6083/version/1552306561/die-eigene-wohnung-%C3%BCber-airbnb-vermieten.jpg',
      stars: '4',
      pool: false,
      betten: '1',
      badezimmer: '2',
      preis: '€1.180,00',
      reviews: '51'
    },
    {
      id: '7',
      name: 'Haus',
      description: 'Ist cool hier',
      img: 'https://bit.ly/2Z4KKcF',
      stars: '5',
      pool: true,
      betten: '3',
      badezimmer: '2',
      preis: '€2.100,00',
      reviews: '62'
    }];

  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode();
  const [state, send, service] = useMachine(selectPrefsMachine);

  return (
    <Stack>


      <VStack p={4}>
        <HStack w="98%" alignItems="stretch">
          <IconButton icon={<FaHome />} isRound="true" size="lg" onClick={() => send('HOME')} />
          {state.matches('singleRoom') && <IconButton icon={<FaBackspace />} isRound="true" size="lg" onClick={() => send('BACK')} />}

          <Spacer />
          <IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} isRound="true" size="lg" onClick={toggleColorMode} />
        </HStack>
        <Heading mb="8" fontWeight="extrabold" size="2xl" bgGradient="linear(to-r, green.500, teal.300, blue.500)" bgClip="text">Feel Home</Heading>

        <PrefContext.Provider value={service}>

          {!state.matches('singleRoom') && <UserPrefs wo={state.context.where} beginn={state.context.start} ende={state.context.end} wer={state.context.who} />}
          {state.matches('listRooms') && <ListItem rooms={rooms} />}
          {state.matches('singleRoom') && state.context.hitId !== 0 && <Details room={rooms[state.context.hitId - 1]} />}

        </PrefContext.Provider>

      </VStack>
      {state.context.totalHits >= 10 && (state.context.poolHits / state.context.totalHits) >= 0.4 && state.matches('listRooms') &&
      toast({
        title: "Hey, Du schaust dir recht oft Unterkünfte mit Pool an!",
        description: "Ich habe die List für dich neu sortiert :)",
        status: "info",
        duration: 5000,
        isClosable: true,
      })}
    </Stack>

  );
}

export default App;
