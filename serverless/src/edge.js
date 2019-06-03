import router from "../../src/routes";

export const handler = (event, context) => {
  
  // Might need this
  const request = event.Records[0].cf.request;
      
  console.log(request);

  const { match, params } = router.findMatchingRoute(request)
  console.log(match);
  console.log(params);    
};
