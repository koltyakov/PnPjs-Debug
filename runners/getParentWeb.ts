import { Web, Site } from './../../PnPjs/dist/packages/sp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const web = new Web(settings.siteUrl);
  const { data, web: parentWeb } = await web.getParentWeb();

  console.log(data, parentWeb);

}).catch(console.log);
