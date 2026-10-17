const sources = [
  ["Enable Model Armor in Gemini Enterprise", "https://docs.cloud.google.com/gemini/enterprise/docs/enable-model-armor"],
  ["Create and manage Model Armor templates", "https://docs.cloud.google.com/model-armor/manage-templates"],
  ["Model Armor filters and confidence levels", "https://docs.cloud.google.com/model-armor/overview"],
];

const videos = [
  ["Model Armor: prompt injection & data leakage prevention", "https://www.youtube.com/watch?v=_w0A3VtQQbI"],
  ["Build no-code agents in the Gemini Enterprise app", "https://www.youtube.com/watch?v=yiY8soEdVUQ"],
];

const templateRows = [
  ["Prompt input template", "Prompt injection and jailbreak detection; sensitive-data detections appropriate to your data. Focus on blocking malicious or risky input before it reaches a model."],
  ["Response output template", "Sensitive-data detections, relevant responsible-AI categories, and malicious URL detection. Focus on preventing unsafe or disallowed material from reaching the user."],
];

export function ModelArmorPlaybook() {
  return (
    <section id="model-armor-guide" className="border-y border-border bg-muted/20 py-20" aria-labelledby="model-armor-guide">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id="model-armor-heading" className="fluid-h2 font-bold text-foreground">What Model Armor templates are—and what they are not</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">A Model Armor template is a reusable security policy for screening prompts and model responses. It stores enabled detection filters, confidence thresholds, enforcement behavior, region, and related settings. It is not an agent template, a prompt library, or a finished “Model Armor model.” For Gemini Enterprise, Google recommends separate templates for user prompts and response outputs because the two sides have different risks.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {templateRows.map(([title, description]) => <article key={title} className="rounded-2xl border border-border bg-card p-6"><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></article>)}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">What the filters inspect</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li><strong className="text-foreground">Prompt injection and jailbreaks:</strong> instructions attempting to bypass the agent’s intended boundaries.</li>
              <li><strong className="text-foreground">Responsible AI categories:</strong> configurable categories such as hate, harassment, sexually explicit, and dangerous content; CSAM has its own default behavior.</li>
              <li><strong className="text-foreground">Sensitive Data Protection:</strong> detect configured sensitive information types; the available basic and advanced configuration choices differ.</li>
              <li><strong className="text-foreground">Malicious URLs:</strong> screen URLs in prompts or generated responses.</li>
            </ul>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Thresholds are confidence levels, not “weak/medium/strong model” settings. Lower thresholds can increase false positives. Tune each category against representative good and bad examples.</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">Create and attach the templates</h3>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li><strong className="text-foreground">1. Prepare the project.</strong> In Google Cloud, select the project that owns your Gemini Enterprise app. Enable the Model Armor API and have an administrator grant Model Armor Admin (<code>roles/modelarmor.admin</code>) to the template creator. The app administrator needs Gemini Enterprise Admin.</li>
              <li><strong className="text-foreground">2. Open template creation.</strong> Go to <a className="font-semibold text-google-blue hover:underline" href="https://console.cloud.google.com/security/modelarmor" target="_blank" rel="noreferrer">Google Cloud Console → Model Armor ↗</a>, confirm the project, then choose <strong>Create Template</strong>.</li>
              <li><strong className="text-foreground">3. Set the template identity and location.</strong> Create a prompt template (for example, <code>ge-user-prompts</code>) and a response template (for example, <code>ge-model-responses</code>). Match the app’s region: for a Global app choose the US or EU multi-region; for a US or EU app choose its matching multi-region. Project, region, and template ID cannot be changed after creation.</li>
              <li><strong className="text-foreground">4. Configure prompt detections.</strong> For the user-prompt template, enable prompt injection and jailbreak detection, malicious URI screening, and the sensitive-data checks appropriate to your policy. Google recommends focusing this template on risky inputs; responsible-AI filters can be disabled here because Gemini has built-in user-prompt checks.</li>
              <li><strong className="text-foreground">5. Configure response detections.</strong> For the response template, choose sensitive-data detection, relevant Responsible AI categories and confidence levels, and malicious URI screening. Do not enable prompt-injection detection on responses; Google warns it can add false positives and latency.</li>
              <li><strong className="text-foreground">6. Select enforcement and create.</strong> Review data-residency settings and any optional filters. Console templates default to <em>Inspect and block</em>; select <em>Inspect only</em> only for a deliberate observation phase. Then select <strong>Create</strong>. Avoid enabling template Cloud Logging for this integration.</li>
              <li><strong className="text-foreground">7. Attach both resource names.</strong> Open Cloud Console → Gemini Enterprise → your app → <strong>Configurations → Assistant</strong>. Enable Model Armor, paste the resource names from both templates, choose whether a screening outage allows or blocks interactions, then select <strong>Save and publish</strong>.</li>
              <li><strong className="text-foreground">8. Test before broad rollout.</strong> Test benign and unsafe prompts, uploaded files, and generated responses. Review false positives, latency, and fail-open/fail-closed behavior, then publish to the intended users.</li>
            </ol>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">For a template in a different project, grant Model Armor User (<code>roles/modelarmor.user</code>) there to the Gemini Enterprise app service account: <code>service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com</code>. Use only the app’s actual project number.</p>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="font-semibold text-foreground">Important limits to include in your design</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <li>For the Gemini Enterprise app integration, Google says not to enable the prompt-injection detector on responses; it can add false positives and latency.</li>
            <li>Model Armor does not remove or mask PII. Sensitive Data Protection can block source material, but its content policies are unavailable for Gemini Enterprise Business edition.</li>
            <li>Google says this integration screens the assistant, Workflow Builder employee-made agents, and Google-made agents. It does not screen custom ADK, A2A, or Dialogflow agent interactions; protect those separately.</li>
            <li>Google does not recommend enabling ordinary Cloud Logging in the templates for Gemini Enterprise because logs may expose sensitive content. Review Data Access audit logs or route logs to storage with stricter access controls.</li>
          </ul>
        </div>

        <p className="mt-5 text-sm leading-6 text-muted-foreground">Edition note: Google says the Model Armor integration is supported across Gemini Enterprise editions at no additional cost. Sensitive Data Protection content policies are a separate control and are not supported on Gemini Enterprise Business edition.</p>

        <div className="mt-5 rounded-2xl border border-google-blue/20 bg-google-blue/5 p-5">
          <h3 className="font-semibold text-foreground">Using the templates with Gemini Notebook Enterprise</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">This is a separate integration path and is currently marked Preview. Google documents attaching the template resource names through the Gemini Notebook Enterprise project configuration API; the Gemini Enterprise app’s Assistant screen above is not the Notebook Enterprise setup path. Allow 10 minutes or more for the change to take effect, then test the screening behavior.</p>
          <a className="mt-3 inline-flex text-sm font-semibold text-google-blue hover:underline" href="https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/enable-model-armor" target="_blank" rel="noreferrer">Google: Configure Model Armor in Gemini Notebook Enterprise ↗</a>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-google-blue hover:border-google-blue/40">{label} ↗</a>)}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Google walkthrough videos</h3>
          <p className="mt-1 text-sm text-muted-foreground">Google’s Gemini for Business learning hub notes that demonstrations can show an earlier interface.</p>
          <div className="mt-4 flex flex-wrap gap-3">{videos.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-google-blue hover:bg-muted">{label} ↗</a>)}<a href="https://cloud.google.com/gemini-enterprise/resources" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-google-blue hover:bg-muted">More Google tutorials ↗</a></div>
        </div>
      </div>
    </section>
  );
}
