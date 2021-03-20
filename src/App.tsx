import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonPage,
  IonLabel
} from "@ionic/react";

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
      setData(JSON.stringify(data));
      console.log('here');
      // url + '/users/signin/'
      fetch(url + '/users/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(responce => {
        responce.json()
      })
      .then((json: any) => {
        setResponce(JSON.parse(json));
      })
      .catch(e => {
        console.log(e);
      });
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  useEffect(() => {
    getMe();
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);
  const [url, setUrl] = useState('https://94.247.135.91:7755');
  const [name, setName] = useState("<username>");
  const [data, setData] = useState("<data>");
  const [responce, setResponce] = useState('here');

  return (
    <IonApp>
      <IonContent>
        <IonPage>
          <div>
            {responce}
          </div>
          <div>
            {data}
          </div>
        </IonPage>
      </IonContent>
    </IonApp>
  );
};

export default App;
