import { showStorageFullEmpire } from './screens/empireScreen';


export const eventLoop = () => {
  if (window.location.host.includes('ogame')) {
    // NOTE: We need to set the interval to check actively the page, since on "document_idle" the page hasn't stopped
    // loading data or actions 20210615:Alevale
    setInterval(() => {

      showStorageFullEmpire();

    }, 1000);
  }
};
