import router from "../../src/routes";

export const handler = (event, context) => {
  console.log(event);
  const { match, params } = router.findMatchingRoute(event)
  console.log(match);
  console.log(params);    
};
