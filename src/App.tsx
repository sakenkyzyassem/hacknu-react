import { useEffect, useRef, useState } from "react";
import { Route, Redirect, useHistory } from 'react-router-dom';
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
  IonRouterOutlet
} from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router';

import "./App.css";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";

const App: React.FunctionComponent = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  
  const [name, setName] = useState("<username>");
  const history = useHistory();

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
      if( name === '<username>') {
        history.push('/welcome')
      } else {
        history.push('/dashboard')
      }
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/welcome" >
              <Welcome />
            </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
