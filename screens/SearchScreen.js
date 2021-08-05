import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar, LogBox } from 'react-native';
import SearchLoader from '../components/SearchLoader';
import Search from '../components/Search';
import data from '../utils/dummy-data';

const SearchScreen = () => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [dummy, setData] = useState([data])
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var data = [
	{"name": "Karina", "email": "Praesent.eu.dui@ut.ca", "uid": "88E6745C-8E48-A7B2-EEF8-C77AC36D3EA5"},
	{"name": "Ferdinand", "email": "felis.Nulla@nibhvulputate.org", "uid": "CF30410A-CEA6-0367-B29E-C934AC3C2713"},
	{"name": "John", "email": "tempor.est@velit.com", "uid": "821D088F-9CDD-A670-8B7C-2D0E851C1F76"},
	{"name": "Illiana", "email": "vel@eget.net", "uid": "EFBC067F-1656-BC0E-0803-C5C37CF4E01C"},
	{"name": "Cathleen", "email": "ultrices.posuere.cubilia@turpisNulla.net", "uid": "65A3447A-0ECF-F797-C27A-35B4DBEA1E4B"},
	{"name": "Samantha", "email": "lacinia.at@sitametlorem.co.uk", "uid": "F2F8728F-14A9-29BA-5659-AE79B8B15F0B"},
	{"name": "Leroy", "email": "vel@ipsum.edu", "uid": "A18CEC26-31F4-9246-22CA-7DE0A6500CC5"},
	{"name": "Hiram", "email": "Phasellus.vitae.mauris@Integervitaenibh.edu", "uid": "51985EAC-D8F6-BFA8-7E5D-702F247E087F"},
	{"name": "Althea", "email": "consectetuer@nonenim.ca", "uid": "E4F7DEB4-23F6-3C91-B68F-FDC5D7CF80D1"},
	{"name": "Nell", "email": "laoreet@vitae.co.uk", "uid": "FB20D40E-F4C9-74F7-235D-D8AA91466944"},
	{"name": "Chastity", "email": "ut.sem@semutdolor.ca", "uid": "D1F30C78-3FEC-CDBF-DF61-101A6C840204"},
	{"name": "MacKenzie", "email": "arcu.Vivamus@justoProin.edu", "uid": "17359AA9-EBA0-3EC1-6218-80D572EEF5E6"},
	{"name": "Isadora", "email": "convallis.convallis.dolor@Cras.ca", "uid": "83261D29-D135-A81B-5FDB-FDA9E56510F0"},
	{"name": "Clare", "email": "vitae@hendreritidante.com", "uid": "A640ECDB-D01E-39A4-AB8E-663BDAD4872F"},
	{"name": "Willow", "email": "Duis.at.lacus@arcueuodio.com", "uid": "0791B0CA-E4FD-F92F-AD2F-B11397EDC53E"},
	{"name": "Reuben", "email": "dui@ullamcorpereu.org", "uid": "0BB08F33-2ED3-7871-00EA-C4533CF43106"},
	{"name": "Justine", "email": "vitae@maurisSuspendisse.com", "uid": "058EF73D-0D2D-9BBD-B765-5A6ECF883C58"},
	{"name": "Cassady", "email": "et.magna@nuncnullavulputate.net", "uid": "C408A49F-C3FB-3910-AD94-BBE992CE18AF"},
	{"name": "Nina", "email": "magna@nunc.com", "uid": "846AF433-7143-2926-855C-BC9CCC613ECF"},
	{"name": "Jerry", "email": "velit.eget@anteMaecenas.ca", "uid": "E2984909-A01E-13E7-FAC9-D9D8C9654B14"},
	{"name": "George", "email": "nibh.sit.amet@vulputate.edu", "uid": "A03270BC-EEF5-489A-4401-043E56146B1B"},
	{"name": "Griffin", "email": "In.mi.pede@Sedauctorodio.ca", "uid": "B11BEE8C-458C-6875-AD17-A4CC31C1CE79"},
	{"name": "Theodore", "email": "quam@senectus.ca", "uid": "F5D9D339-48F7-4EEA-2F24-61C2B8BAF9F1"},
	{"name": "Gemma", "email": "id@dolor.com", "uid": "BEB7F203-8758-5835-F8B8-35085ACF3341"},
	{"name": "Diana", "email": "sed@turpisegestasFusce.edu", "uid": "C9846B9D-C780-8821-2098-386FD587E1BC"},
	{"name": "Joshua", "email": "Fusce@est.com", "uid": "D9854E94-6786-7523-651F-F5EF567F3431"},
	{"name": "Noah", "email": "Vestibulum.accumsan.neque@orcisemeget.edu", "uid": "F2331E43-64EF-CBE1-DAE0-6894F546F6F2"},
	{"name": "Cameran", "email": "et.nunc.Quisque@Sednuncest.co.uk", "uid": "026A2382-FAEF-2621-9C8D-6CA3C1ABC54F"},
	{"name": "Len", "email": "Sed@auguescelerisquemollis.com", "uid": "D1C3D66C-A822-D36E-2259-5C255F6AF7EC"},
	{"name": "Shaine", "email": "risus.Nulla@massarutrum.com", "uid": "2BE15D67-7709-07DE-C921-3773EE8C0C01"},
	{"name": "Summer", "email": "tincidunt.adipiscing@vulputate.ca", "uid": "916CEFC4-C046-5285-731D-C37E5F0A25E7"},
	{"name": "Chester", "email": "purus.Duis@pede.com", "uid": "5F5D9DD4-9E69-2F36-0FC1-C08928ED0150"},
	{"name": "Malachi", "email": "libero.Morbi@rhoncus.ca", "uid": "70D6FDB8-BF68-A7CA-315E-76966B61C46A"},
	{"name": "Venus", "email": "magna@Quisquenonummy.net", "uid": "86EC2A0E-F22D-088E-2D85-EC3DB37902A3"},
	{"name": "Mechelle", "email": "Suspendisse.dui.Fusce@quamPellentesquehabitant.edu", "uid": "E3D3BCF0-9040-FCB8-6922-A664FAEA6EF9"},
	{"name": "Anthony", "email": "at.pretium.aliquet@montes.co.uk", "uid": "D12C0EDD-4935-3CDA-95CA-AC8F5CA4E68D"},
	{"name": "Noah", "email": "semper.pretium@porttitor.net", "uid": "86C97265-768F-9644-D295-C6EF87952CC4"},
	{"name": "Hermione", "email": "semper.cursus@rutrum.edu", "uid": "72C6E9B8-FC8C-46DD-B0C9-E1E5A20EF363"},
	{"name": "Channing", "email": "tortor.at@sapienmolestieorci.com", "uid": "A0BD09B4-6C7D-01FF-F214-F470019556A4"},
	{"name": "Urielle", "email": "vel@convalliserateget.net", "uid": "387C933D-7F72-6A2C-6852-3418572AF76B"},
	{"name": "Keane", "email": "vitae.velit.egestas@pharetrafelis.co.uk", "uid": "2BB7196E-0D53-D3EB-EA15-821C394BC0E6"},
	{"name": "Rudyard", "email": "Nunc.mauris@et.edu", "uid": "F6A1135D-F89E-5AD5-9982-1911FC6E2A49"},
	{"name": "Francis", "email": "ipsum.porta@eliterat.ca", "uid": "E28B9CCB-A825-F461-E294-33D92004DD05"},
	{"name": "Hayes", "email": "ornare.tortor.at@Proinvel.com", "uid": "B0FC064A-E214-64A9-A21A-C3CB9890B827"},
	{"name": "Christen", "email": "dui.quis.accumsan@placerataugueSed.ca", "uid": "5D857DED-8007-6AE3-F839-246AAF097A1F"},
	{"name": "Rogan", "email": "Phasellus@congueInscelerisque.org", "uid": "0270D209-8550-7F81-10EB-AEE8EF27522C"},
	{"name": "Edan", "email": "aliquet@ornareplaceratorci.org", "uid": "8FB0F65B-8941-9393-C532-E5CE12CA7A99"},
	{"name": "Hedwig", "email": "odio@atliberoMorbi.net", "uid": "44C15A15-CA17-C63A-841D-5E6E1EB42446"},
	{"name": "Lucy", "email": "ipsum.leo@pede.edu", "uid": "6D73FBC5-6CE5-3EEA-63D7-4CD5C2528408"},
	{"name": "Timothy", "email": "libero.Integer.in@ullamcorpervelitin.net", "uid": "689C3077-5445-92BC-FC8C-13D50CE50F07"},
	{"name": "Scarlet", "email": "tristique.aliquet.Phasellus@egestasnunc.net", "uid": "641DD38A-BAB8-EA40-F606-D7F49525AE09"},
	{"name": "Signe", "email": "non.hendrerit@tinciduntcongueturpis.ca", "uid": "B9D5694B-3418-692A-D7F5-05B744D2BB19"},
	{"name": "Quinn", "email": "turpis.Aliquam.adipiscing@sempererat.ca", "uid": "AC348A09-876A-0374-AA42-9CF521EAB661"},
	{"name": "Tyler", "email": "pharetra.ut@Quisqueimperdiet.edu", "uid": "03E416F2-45DA-AFFF-E4C6-BBA021B86C1F"},
	{"name": "Fritz", "email": "pede.Suspendisse@sollicitudinorci.edu", "uid": "4B5E7475-0A93-6B71-16FA-09890F412C63"},
	{"name": "Lila", "email": "fermentum.fermentum@Aeneangravidanunc.co.uk", "uid": "24D073B4-7BF7-BECE-F3EF-9755EE1EBC38"},
	{"name": "Jane", "email": "eu@insodaleselit.ca", "uid": "BBB779F8-C5FC-A2C0-C819-6F8B444CEB03"},
	{"name": "Aquila", "email": "id@volutpatornare.com", "uid": "AE261F39-C39E-E281-FB2A-45659477B8F4"},
	{"name": "Nehru", "email": "ullamcorper.Duis.at@mi.ca", "uid": "C83EE541-8BF5-B7CF-A527-628AD97428DA"},
	{"name": "Martina", "email": "Aliquam@quamPellentesque.com", "uid": "3C63C88E-FB62-9842-13EB-FF5FBD728FDF"},
	{"name": "Conan", "email": "nonummy.ut.molestie@Phasellusinfelis.ca", "uid": "EBD45F27-49DE-BF67-0C6A-8B9CB5129D6C"},
	{"name": "Roanna", "email": "Morbi@scelerisqueneque.co.uk", "uid": "94D56CEB-DA84-1496-1252-DC60583DF5F8"},
	{"name": "Colleen", "email": "et.magna.Praesent@nisiAenean.org", "uid": "15A25702-5AD7-9524-DC6F-E5A09D1C6AB7"},
	{"name": "Amena", "email": "vitae@tincidunttempusrisus.co.uk", "uid": "2726898D-9303-2F27-4BE6-0AEFB54A0616"},
	{"name": "Rafael", "email": "elit.sed.consequat@magnaaneque.org", "uid": "3703FFB7-B341-0C31-02FA-EADD5455600D"},
	{"name": "Kameko", "email": "quis.pede@et.com", "uid": "E162DC5C-85D6-FF8A-2A6E-FF825FCB2022"},
	{"name": "Jael", "email": "Quisque.nonummy@Duis.ca", "uid": "953079B9-FF35-4E0B-2BDD-208105D6583C"},
	{"name": "Teagan", "email": "iaculis@Morbi.co.uk", "uid": "7405C88A-7D0F-58D6-8E06-26F7797CF089"},
	{"name": "Heather", "email": "non.dui@pharetra.ca", "uid": "52A05B43-13FE-C0DD-F20C-E033C086A041"},
	{"name": "Zena", "email": "tempus.mauris.erat@antedictummi.com", "uid": "AADB6C94-1228-AF4B-5678-197B100CC43C"},
	{"name": "Emily", "email": "id.mollis@nequeInornare.org", "uid": "034B17D1-5E42-4501-33B8-B0E8A240D526"},
	{"name": "Marsden", "email": "interdum@porttitorscelerisque.ca", "uid": "D6435455-A2B3-44DF-998F-26D20BE5F6EB"},
	{"name": "Branden", "email": "egestas@inconsectetuer.com", "uid": "F75177BE-37EB-8991-C04E-162FC46DF032"},
	{"name": "Samson", "email": "sit.amet@SuspendissesagittisNullam.com", "uid": "BC9FFB07-3FD7-1321-BBEE-F0A0DBC4405A"},
	{"name": "Jana", "email": "Phasellus.vitae.mauris@pede.com", "uid": "6531B6E2-A3FB-0D2E-F23F-C6C332A238D2"},
	{"name": "Cullen", "email": "diam.Sed@lacusAliquamrutrum.net", "uid": "095BEAC2-D24A-BCEC-C013-184C7844B342"},
	{"name": "Adara", "email": "neque@erosturpis.co.uk", "uid": "58AEADDA-A611-6678-6331-A74A00170E98"},
	{"name": "Geraldine", "email": "Curabitur.consequat.lectus@egestas.net", "uid": "70BBCB96-A20B-371F-E04A-325857B1D34C"},
	{"name": "Fulton", "email": "Curabitur@Vestibulumanteipsum.co.uk", "uid": "DEC175D0-D024-3FD9-C138-6F46CF165B05"},
	{"name": "Marvin", "email": "adipiscing.lacus.Ut@Infaucibus.co.uk", "uid": "2700F145-0989-5C86-F65B-B22A3CA0E648"},
	{"name": "Declan", "email": "sem@leoVivamusnibh.ca", "uid": "69E71564-ED21-96E3-52BE-1D34F1F6D0AE"},
	{"name": "Britanni", "email": "euismod@nisisem.org", "uid": "6777E1CC-5F52-6A92-A567-D6DCAAD1F728"},
	{"name": "Alexis", "email": "Nam.nulla.magna@nuncsed.edu", "uid": "E197DEDB-76E3-A642-5508-1525F98FFD49"},
	{"name": "Eleanor", "email": "id.ante.dictum@neceuismod.net", "uid": "F4B76ECF-676F-0CB5-1A73-72646621917F"},
	{"name": "Ronan", "email": "semper.tellus@nibhPhasellusnulla.ca", "uid": "AF490AB2-78AE-AB46-5751-17367DA070F2"},
	{"name": "Jared", "email": "lacus.Cras@faucibusid.org", "uid": "FD5974D9-F99C-1154-8E58-6E2463B81769"},
	{"name": "Cassady", "email": "cursus.et@rutrumurnanec.net", "uid": "B2F3CD17-4FEB-70A0-CF68-CB96C7EF577D"},
	{"name": "Demetria", "email": "Cras.sed.leo@nec.org", "uid": "637B41D3-4123-DF02-2535-158499980026"},
	{"name": "Quin", "email": "scelerisque.neque.sed@Pellentesqueutipsum.co.uk", "uid": "85717149-6AA3-BFDB-4954-9B508E0BD1E2"},
	{"name": "Yardley", "email": "Cras.convallis@convallis.org", "uid": "D1DE3019-C3C2-B688-FFDF-8C6E39DA8AC9"},
	{"name": "Damon", "email": "consequat@parturientmontesnascetur.co.uk", "uid": "8F1F54D1-7CDB-A687-5A9E-01677D2690E9"},
	{"name": "Dane", "email": "Ut.nec.urna@vulputatevelit.org", "uid": "E4406B3D-3585-2267-9CC8-7378ECFA69D0"},
	{"name": "Kylan", "email": "amet.faucibus.ut@euismodmauriseu.co.uk", "uid": "EF33DE35-9D77-60C7-3BDA-3B02AB21FC59"},
	{"name": "Rhoda", "email": "sit.amet.massa@ipsumdolorsit.ca", "uid": "E2383260-951F-5197-4458-A0E85DA87593"},
	{"name": "Ebony", "email": "neque@natoquepenatibus.edu", "uid": "1BBEF54C-FC52-3676-B16C-D23DD13922B0"},
	{"name": "Noel", "email": "In.ornare@magna.org", "uid": "769ACB5B-EB24-9104-5EDE-10DD0B2246DC"},
	{"name": "Bernard", "email": "tristique.pellentesque@malesuada.org", "uid": "96977DB7-3692-23D9-BE98-E1FBAC0872EE"},
	{"name": "Destiny", "email": "eu@sed.com", "uid": "8EF1B1D8-DB47-B8FC-A2BA-40AE511487BD"},
	{"name": "Mallory", "email": "nibh@neque.co.uk", "uid": "0393B0EB-663C-CFF8-17E0-E82721676577"},
	{"name": "Lillith", "email": "mauris.rhoncus@nonfeugiat.ca", "uid": "4424BA39-8DD8-72D5-E4DA-B18ABAA0CA94"}
];
  LogBox.ignoreAllLogs(array)
  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Search clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            backgroundColor: 'white',
            paddingTop: 55
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic">
          {data.map(item => {
              return <SearchLoader key={item.uid} />
          })}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SearchScreen;