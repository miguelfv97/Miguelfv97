import("undici").then(async ({ProxyAgent, setGlobalDispatcher}) => {
  setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
  const API = "https://biwenger.as.com/api/v2";
  const login = await fetch(API+"/auth/login", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({email: process.env.BIWENGER_EMAIL, password: process.env.BIWENGER_PASSWORD})}).then(r=>r.json());
  const token = login.token;
  const authHeaders = {Authorization: `Bearer ${token}`};
  const account = await fetch(API+"/account", {headers: authHeaders}).then(r=>r.json());
  const league = account.data.leagues.find(l => l.id === 2143480);
  const lhHeaders = {...authHeaders, "X-League": league.id, "X-User": league.user.id};
  const data = await fetch(API+`/competitions/la-liga/data?lang=es&score=${league.scoreID}`, {headers: lhHeaders}).then(r=>r.json());
  const teams = {};
  for (const [id, t] of Object.entries(data.data.teams)) teams[id] = t.name;
  (await import('fs')).default.writeFileSync('/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/teams.json', JSON.stringify(teams));
  console.log(JSON.stringify(teams));
});
