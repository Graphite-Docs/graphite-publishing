const keys = require("./keys.js");

export function personalPlan() {
  const script = document.createElement("script");
  script.src="https://checkout.stripe.com/checkout.js" ;
  script.className="stripe-button";
  script.dataset.key= keys.stripePubKey;
  script.dataset.amount="1999";
  script.dataset.name="Graphite";
  script.dataset.description="Personal Plan - Monthly";
  script.dataset.image="https://pbs.twimg.com/profile_images/957020408800206848/Ed8Mp2OJ_400x400.jpg";
  script.dataset.locale="auto";
  let form = document.getElementById('personalPlan');
  form.appendChild(script);
}

export function teamPlan() {
  const script = document.createElement("script");
  script.src="https://checkout.stripe.com/checkout.js" ;
  script.className="stripe-button";
  script.dataset.key= keys.stripePubKey;
  script.dataset.amount="5999";
  script.dataset.name="Graphite";
  script.dataset.description="Team Plan - Monthly";
  script.dataset.image="https://pbs.twimg.com/profile_images/957020408800206848/Ed8Mp2OJ_400x400.jpg";
  script.dataset.locale="auto";
  let form = document.getElementById('teamPlan');
  form.appendChild(script);
}

export function proPlan() {
  const script = document.createElement("script");
  script.src="https://checkout.stripe.com/checkout.js" ;
  script.className="stripe-button";
  script.dataset.key = keys.stripePubKey;
  script.dataset.amount="19999";
  script.dataset.name="Graphite";
  script.dataset.description="Pro Plan - Monthly";
  script.dataset.image="https://pbs.twimg.com/profile_images/957020408800206848/Ed8Mp2OJ_400x400.jpg";
  script.dataset.locale="auto";
  let form = document.getElementById('proPlan');
  form.appendChild(script);
}
