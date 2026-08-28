import("undici").then(async ({ProxyAgent, setGlobalDispatcher}) => {
  setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
  const API = "https://biwenger.as.com/api/v2";

  const login = await fetch(API+"/auth/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({email: process.env.BIWENGER_EMAIL, password: process.env.BIWENGER_PASSWORD})
  }).then(r=>r.json());
  const token = login.token;
  const authHeaders = {Authorization: `Bearer ${token}`};

  const account = await fetch(API+"/account", {headers: authHeaders}).then(r=>r.json());
  const league = account.data.leagues.find(l => l.id === 2143480);
  const leagueId = league.id;
  const userId = league.user.id;
  const scoreID = league.scoreID;

  const lhHeaders = {...authHeaders, "X-League": leagueId, "X-User": userId};

  const leagueData = await fetch(API+"/league?fields=*,standings,group", {headers: lhHeaders}).then(r=>r.json());
  const standings = leagueData.data.standings;

  const playersData = await fetch(API+`/competitions/la-liga/data?lang=es&score=${scoreID}`, {headers: lhHeaders}).then(r=>r.json());
  const players = playersData.data.players;

  const rosters = {};
  for (const s of standings) {
    const mgrId = s.id;
    const res = await fetch(API+`/user/${mgrId}?fields=*,players(id,owner)`, {headers: lhHeaders}).then(r=>r.json());
    rosters[mgrId] = { name: s.name, points: s.points, players: res.data.players || [] };
  }

  const out = { scoreID, standings, players, rosters };
  console.log(JSON.stringify(out));
});
