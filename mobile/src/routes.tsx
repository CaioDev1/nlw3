import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()
 
import OrphanagesMap from './pages/orphanagesMap'
import OrphanagesDetails from './pages/orphanageDetails'
import OrphanagesData from './pages/createOrphanage/orphanagesData'
import SelectMapPosition from './pages/createOrphanage/selectMapPosition'

import Header from './components/header'

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#f2f3f5'
                }
            }}>
                <Screen
                    name='OrphanagesMap' 
                    component={OrphanagesMap}
                />

                <Screen
                    name='OrphanageDetails' 
                    component={OrphanagesDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title='Orfanato'/>
                    }}
                />

                <Screen 
                    name='OrphanageData' 
                    component={OrphanagesData}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Informe os dados'/>
                    }}
                />
                <Screen 
                    name='SelectMapPosition' 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Seleciona no mapa'/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}