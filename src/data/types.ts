export interface TypeProfile {
    code: string;
    name: string;
    family: string;
    familyId: string;
    color: string;
    shortDescription: string;
    fullProfile: string;
}

export const typesData: TypeProfile[] = [
    {
        code: "Fe/Ne",
        name: "The Illuminator",
        family: "Fe-types",
        familyId: "fe",
        color: "var(--gradient-nf)",
        shortDescription: "Bright, expressive emotional presence. Uplifting energy.",
        fullProfile: `
**Why this name fits this type**

Across this entire group, the shared pattern is:
* Bright, expressive emotional presence
* Warm, socially open demeanor
* High enthusiasm and visible charm
* Big “uplifting energy” — the kind of people who light up a room
* A mix of charisma, humor, and emotional intelligence
* Clear communicative faces — very forward, relatable, connective

It’s a group that radiates positive energy, expressive openness, helping others feel seen, and uplifting environments.
This is NOT a chaotic performer type and not a quiet empath type — it’s a confident, expressive, socially magnetic type.
People who can teach, charm, communicate, joke, connect, and shine.

**A personality defined by expressive warmth, social brightness, and emotional uplift.**
`
    },
    {
        code: "Fe/Ni",
        name: "The Oracle",
        family: "Fe-types",
        familyId: "fe",
        color: "var(--gradient-nf)",
        shortDescription: "Strong, grounded emotional presence. Natural authority and guidance.",
        fullProfile: `
⭐ THE ORACLE
The ENFJ Standard • Savior Fe/Ni • Demon Se/Ti

You are the anchor in the storm.
Some people light up a room; you center it.
The Oracle possesses a rare combination of emotional depth and guiding wisdom. You don’t just see people for who they are; you see who they could become. Your presence is grounding, reassuring, and profoundly influential.
You are the mentor, the guide, the one people turn to when they need the truth delivered with love.

Core Vibe: Grounded Wisdom
Oracles carry a steady, authoritative energy that says:
* “I know the way.”
* “You can grow from this.”
* “Let’s find the deeper meaning.”
You don't need to be loud to be heard. Your authority comes from a deep well of emotional intelligence and life experience.

What Makes You Different
Oracles aren't just empathetic listeners; they are transformative leaders.
You excel at:
✔ Seeing the potential in others
You instinctively know what people are capable of, even before they do.
✔ Guiding through complexity
You can navigate messy emotional situations with clarity and grace.
✔ Speaking the hard truths
You deliver difficult messages in a way that heals rather than hurts.
✔ Creating a culture of growth
You inspire everyone around you to be a better version of themselves.

Your Inner Engine
Savior Fe + Ni
You lead with connection and insight. You thrive when you are helping others navigate their path and find meaning.
Your Challenge: Demon Se/Ti
You can struggle with the chaos of the immediate moment or cold, impersonal logic. You may over-plan or over-analyze to avoid the unpredictability of the real world.

When You’re at Your Best
You become the person who:
* mentors the next generation
* resolves deep conflicts
* articulates shared values
* provides stability in crisis
Your gift is clarity. Your presence is a compass.

When You’re Growing
You learn to:
* let go of the need to control the outcome
* trust others to make their own mistakes
* value the present moment as much as the future
* set boundaries to protect your own energy
A balanced Oracle is a beacon of wisdom, guiding others without carrying their burden.

⭐ The Essence of the Oracle
“Guidance, influence, emotional authority.”
You don't just help people feel better; you help them become better.
You are the human equivalent of a lighthouse.
`
    },
    {
        code: "Fe/Se",
        name: "The Maverick",
        family: "Fe-types",
        familyId: "fe",
        color: "var(--gradient-sf)",
        shortDescription: "Strong individuality, entrepreneurial drive, and self-made energy.",
        fullProfile: `
⭐ THE MAVERICK
The ENFJ Jumper • Savior Fe/Se • Demon Ni/Ti

You are the force that breaks the mold.
You don’t ask for permission; you create your own path.
The Maverick is defined by a fierce independence and a drive to make things happen. You aren't here to maintain the status quo; you're here to disrupt it. You combine social intelligence with a bias for action that makes you unstoppable.
You are the entrepreneur, the disruptor, the one who sees the rules and decides which ones to break.

Core Vibe: Independent Drive
Mavericks carry a sharp, forward-moving energy that says:
* “Watch me do this.”
* “There’s a better way.”
* “I’m betting on myself.”
You are not chaotic, but you are autonomous. You move fast, and you bring people along for the ride.

What Makes You Different
Mavericks aren't just rebels; they are builders.
You excel at:
✔ Taking calculated risks
You aren't afraid to fail if it means moving forward.
✔ Rallying people to a cause
Your conviction is contagious.
✔ Pivoting instantly
You read the room and the market, adapting faster than anyone else.
✔ Forging your own identity
You refuse to be defined by others' expectations.

Your Inner Engine
Savior Fe + Se
You lead with connection and action. You thrive when you are engaging with the world, making deals, and pushing boundaries.
Your Challenge: Demon Ni/Ti
You can struggle with long-term planning or deep, solitary analysis. You may jump too fast without considering the consequences or the underlying logic.

When You’re at Your Best
You become the person who:
* launches new ventures
* challenges outdated systems
* inspires courage in others
* turns obstacles into opportunities
Your gift is momentum. Your presence is a catalyst.

When You’re Growing
You learn to:
* pause and strategize before acting
* value the wisdom of the past
* listen to the quiet logic within
* finish what you start
A balanced Maverick is a visionary builder, turning disruption into progress.

⭐ The Essence of the Maverick
“Independence, drive, ambition.”
You don't wait for the future; you build it.
You are the human equivalent of a spark.
`
    },
    {
        code: "Fe/Si",
        name: "The Guardian",
        family: "Fe-types",
        familyId: "fe",
        color: "var(--gradient-sf)",
        shortDescription: "Protective, stabilizing, pillar of the community energy.",
        fullProfile: `
⭐ THE GUARDIAN
The ESFJ Standard • Savior Fe/Si • Demon Ne/Ti

You are the foundation everyone else builds upon.
In a world of constant change, you are the rock.
The Guardian is the protector of people and the steward of values. You provide the stability, the care, and the structure that makes life possible. You don't seek the spotlight, but without you, the show couldn't go on.
You are the caregiver, the pillar, the one who actually shows up when it matters.

Core Vibe: Unwavering Protection
Guardians carry a warm, stabilizing energy that says:
* “I’ve got you.”
* “We’re in this together.”
* “Let’s make this right.”
Your warmth is controlled and reliable. It’s the warmth of a hearth, not a wildfire.

What Makes You Different
Guardians aren't just nice; they are fiercely loyal.
You excel at:
✔ Creating safety
You instinctively know how to make people feel secure.
✔ Upholding traditions
You understand the value of history and continuity.
✔ Managing the details of care
You remember the birthdays, the allergies, the little things that matter.
✔ Standing firm in a crisis
When others panic, you plan.

Your Inner Engine
Savior Fe + Si
You lead with connection and reliability. You thrive when you are caring for your community and maintaining order.
Your Challenge: Demon Ne/Ti
You can struggle with the unknown or with abstract, impersonal theories. You may resist change or feel threatened by chaos.

When You’re at Your Best
You become the person who:
* holds the community together
* preserves what is valuable
* nurtures growth in a safe environment
* leads with quiet authority
Your gift is stability. Your presence is a shelter.

When You’re Growing
You learn to:
* embrace the unexpected
* trust your own logic
* let go of outdated traditions
* allow others to take risks
A balanced Guardian is a wise protector, keeping us safe while letting us grow.

⭐ The Essence of the Guardian
“Duty, steadiness, protection.”
You don't just care for people; you secure their future.
You are the human equivalent of a home.
`
    },
    {
        code: "Fi/Ne",
        name: "The Dreamweaver",
        family: "Fi-types",
        familyId: "fi",
        color: "var(--gradient-nf)",
        shortDescription: "Deep inner world, rich imagination, and emotional storytelling.",
        fullProfile: `
⭐ THE DREAMWEAVER
The INFP Standard • Savior Fi/Ne • Demon Si/Te

You live in a world of rich emotion and endless possibility.
You feel things more deeply than most, and you turn those feelings into art.
The Dreamweaver is a vessel for the human experience. You possess a profound inner world that is constantly weaving stories, emotions, and ideas into something beautiful. You are not dramatic; you are deep.
You are the artist, the poet, the soul who reminds us what it means to be human.

Core Vibe: Soulful Authenticity
Dreamweavers carry a soft, resonant energy that says:
* “I feel this deeply.”
* “Imagine if…”
* “This is who I am.”
You don't perform for attention. Your charisma comes from your absolute genuineness.

What Makes You Different
Dreamweavers aren't just creative; they are emotionally honest.
You excel at:
✔ Expressing the inexpressible
You find words and images for feelings others can't name.
✔ Seeing the beauty in the broken
You value authenticity over perfection.
✔ Listening with your whole heart
You create a space where others feel safe to be vulnerable.
✔ Staying true to yourself
You refuse to compromise your values for approval.

Your Inner Engine
Savior Fi + Ne
You lead with personal values and imagination. You thrive when you are exploring your inner world and expressing it outwardly.
Your Challenge: Demon Si/Te
You can struggle with routine, structure, and the harsh demands of efficiency. You may feel overwhelmed by the details of daily life or the pressure to 'produce'.

When You’re at Your Best
You become the person who:
* inspires others with your vision
* heals through art and storytelling
* champions the underdog
* brings magic into the mundane
Your gift is depth. Your presence is a mirror.

When You’re Growing
You learn to:
* ground your dreams in reality
* value structure as a support for your art
* communicate your needs clearly
* take action even when you're afraid
A balanced Dreamweaver is a powerful creator, turning dreams into reality.

⭐ The Essence of the Dreamweaver
“Depth, authenticity, imagination.”
You don't just imagine the world; you feel it.
You are the human equivalent of a poem.
`
    },
    {
        code: "Fi/Ni",
        name: "The Forcebringer",
        family: "Fi-types",
        familyId: "fi",
        color: "var(--gradient-nf)",
        shortDescription: "Intensity, willpower, and identity carved through effort.",
        fullProfile: `
⭐ THE FORCEBRINGER
The ISFP Jumper • Savior Fi/Ni • Demon Se/Te

You are a force of nature.
You don’t just exist; you carve your path through the world with sheer will.
The Forcebringer is defined by an intense, disciplined power. You are not here to drift; you are here to dominate your craft and shape your destiny. You build your identity like a fortress, brick by brick, through effort and grit.
You are the master, the individualist, the one who pushes limits because you have to.

Core Vibe: Relentless Intensity
Forcebringers carry a potent, focused energy that says:
* “I will master this.”
* “Watch me work.”
* “I am my own creation.”
It’s not soft. It’s not gentle. It is impactful.

What Makes You Different
Forcebringers aren't just determined; they are self-forged.
You excel at:
✔ Pushing through pain
You have a high tolerance for the struggle required to achieve greatness.
✔ Mastering a singular craft
You go deeper than anyone else is willing to go.
✔ Projecting unshakeable confidence
Your belief in yourself is your strongest weapon.
✔ Standing alone
You don't need a crowd to validate your worth.

Your Inner Engine
Savior Fi + Ni
You lead with personal values and singular vision. You thrive when you are pursuing a goal that aligns with your deepest self.
Your Challenge: Demon Se/Te
You can struggle with the chaos of the sensory world or the demands of the tribe. You may become too isolated or too rigid in your pursuit of perfection.

When You’re at Your Best
You become the person who:
* redefines what is possible
* inspires others through example
* creates a legacy of excellence
* embodies disciplined freedom
Your gift is will. Your presence is a challenge.

When You’re Growing
You learn to:
* let others in
* find joy in the process, not just the result
* adapt to changing circumstances
* use your power to lift others up
A balanced Forcebringer is a legendary figure, showing us the power of the human spirit.

⭐ The Essence of the Forcebringer
“Intensity, self-mastery, drive.”
You don't just live life; you conquer it.
You are the human equivalent of a storm.
`
    },
    {
        code: "Fi/Se",
        name: "The Shapeshifter",
        family: "Fi-types",
        familyId: "fi",
        color: "var(--gradient-sf)",
        shortDescription: "Extreme versatility, social fluidity, and evolving identity.",
        fullProfile: `
⭐ THE SHAPESHIFTER
The ISFP Standard • Savior Fi/Se • Demon Ni/Te

You are a thousand versions of yourself.
You don't fit in one box, and you never will.
The Shapeshifter is defined by radical adaptability and creative range. You move between identities, modes, and worlds with ease. You're not scattered; you're multidimensional. You don't have one self — you have many, and each one is authentic.
You are the artist, the athlete, the creator who refuses to be defined.

Core Vibe: Fluid Mastery
Shapeshifters carry a versatile, transformative energy that says:
* "I can be whoever I need to be."
* "Watch me reinvent myself."
* "I'm not one thing — I'm everything."
You adapt without losing yourself. You transform without pretending.

What Makes You Different
Shapeshifters aren't just flexible; they are masters of reinvention.
You excel at:
✔ Transforming between roles
You can be serious one moment, playful the next, and both feel real.
✔ Navigating different worlds
You move between social circles, creative genres, and life phases with ease.
✔ Blending charm with depth
You're socially fluid but emotionally grounded.
✔ Reinventing your identity
You don't fear change; you embrace it as evolution.
✔ Reading the room instantly
You know what energy is needed and you become it.

Your Inner Engine
Savior Fi + Se
You lead with personal authenticity and sensory presence. You thrive when you're experiencing life fully and expressing yourself freely.
Your Challenge: Demon Ni/Te
You can struggle with long-term vision or rigid systems. You may resist being pinned down or forced into one path.

When You're at Your Best
You become the person who:
* transforms art forms
* bridges different communities
* shows others the power of flexibility
* creates without boundaries
Your gift is range. Your presence is possibility.

When You're Growing
You learn to:
* commit to one path without losing your versatility
* value consistency alongside adaptability
* trust your long-term vision
* use structure as a tool, not a cage
A balanced Shapeshifter is unstoppable — all the range, with direction.

⭐ The Essence of the Shapeshifter
"Adaptability, reinvention, charisma."
You don't just change; you evolve.
You are the human equivalent of water.
`
    },
    {
        code: "Fi/Si",
        name: "The Charmist",
        family: "Fi-types",
        familyId: "fi",
        color: "var(--gradient-sf)",
        shortDescription: "Soft, disarming social presence and effortless likability.",
        fullProfile: `
⭐ THE CHARMIST
The ISFP Jumper • Savior Fi/Si • Demon Ne/Te

You make people feel at home.
Your presence is a warm hug in human form.
The Charmist has a gentle, disarming quality that makes everyone feel safe. You're not trying to impress anyone; you're just being yourself. And somehow, that's exactly what people need. Your warmth is effortless, your charm is understated, and your kindness is genuine.
You are the friend, the listener, the one who makes life feel softer.

Core Vibe: Gentle Magnetism
Charmists carry a soft, inviting energy that says:
* "You're welcome here."
* "I'm easy to talk to."
* "Let's just be real."
You don't demand attention; you attract it naturally through your warmth.

What Makes You Different
Charmists aren't flashy or intense; they are quietly magnetic.
You excel at:
✔ Making people feel comfortable
You have a gift for putting others at ease instantly.
✔ Being emotionally accessible
Your feelings are clear, readable, and relatable.
✔ Connecting without pressure
You don't force relationships; you let them unfold naturally.
✔ Balancing humor with sincerity
You can be funny and heartfelt in the same breath.
✔ Staying grounded and real
You don't pretend to be someone you're not.

Your Inner Engine
Savior Fi + Si
You lead with personal values and lived experience. You thrive when you're being authentic and connecting with people in real, tangible ways.
Your Challenge: Demon Ne/Te
You can struggle with abstract possibilities or cold logic. You may resist overthinking or being pushed into the unknown.

When You're at Your Best
You become the person who:
* creates safe spaces
* brings people together through warmth
* makes the ordinary feel special
* reminds others to be kind
Your gift is ease. Your presence is comfort.

When You're Growing
You learn to:
* explore beyond your comfort zone
* trust your own ideas
* speak up for yourself
* embrace the unfamiliar
A balanced Charmist is a beacon of warmth with quiet confidence.

⭐ The Essence of the Charmist
"Warmth, approachability, subtle charisma."
You don't just make friends; you make people feel human.
You are the human equivalent of home.
`
    },
    {
        code: "Ne/Fe",
        name: "The Visionary",
        family: "Ne-types",
        familyId: "ne",
        color: "var(--gradient-nf)",
        shortDescription: "Conceptual thinking, creative architecture of ideas, and originality.",
        fullProfile: `
⭐ THE VISIONARY
The ENTP Standard • Savior Ne/Fe • Demon Si/Ti

You see what others can't.
Your mind is a universe of ideas, connections, and possibilities.
The Visionary is a builder of mental worlds. You don't just think; you architect entire systems, stories, and frameworks. You see patterns where others see chaos. You create concepts that change how people understand reality.
You are the inventor, the worldbuilder, the one who imagines the future.

Core Vibe: Conceptual Brilliance
Visionaries carry a curious, imaginative energy that says:
* "What if we tried this?"
* "I see a pattern here."
* "Let me show you a different way to think about this."
You're not loud or flashy; you're quietly brilliant.

What Makes You Different
Visionaries aren't just smart; they are creatively intelligent.
You excel at:
✔ Building conceptual frameworks
You create new ways of understanding the world.
✔ Seeing the big picture
You connect dots others don't even notice.
✔ Thinking unconventionally
You question assumptions and explore alternatives.
✔ Communicating complex ideas
You make the abstract feel accessible.
✔ Staying curious
You never stop asking "why" and "what if."

Your Inner Engine
Savior Ne + Fe
You lead with possibility and connection. You thrive when you're exploring ideas and sharing them with others.
Your Challenge: Demon Si/Ti
You can struggle with details, routines, or rigid logic. You may resist being tied down to the mundane.

When You're at Your Best
You become the person who:
* invents new paradigms
* inspires others to think differently
* builds worlds and systems
* bridges ideas across disciplines
Your gift is vision. Your presence is expansion.

When You're Growing
You learn to:
* ground your ideas in reality
* value the details
* finish what you start
* trust your internal logic
A balanced Visionary is a world-changer — all the ideas, with execution.

⭐ The Essence of the Visionary
"Conceptual depth, originality, intellectual creativity."
You don't just imagine the future; you design it.
You are the human equivalent of a blueprint.
`
    },
    {
        code: "Ne/Fi",
        name: "The Eccentricist",
        family: "Ne-types",
        familyId: "ne",
        color: "var(--gradient-nf)",
        shortDescription: "Creative quirk, playful originality, and unconventional expression.",
        fullProfile: `
⭐ THE ECCENTRICIST
The ENFP Jumper • Savior Ne/Fi • Demon Si/Te

You are gloriously, unapologetically weird.
And that's your superpower.
The Eccentricist doesn't follow the script. You create your own aesthetic, your own rules, your own reality. You're not trying to fit in; you're trying to stand out. Your creativity is strange, playful, and brilliant. You make people laugh, think, and question everything.
You are the oddball, the artist, the one who makes weird look cool.

Core Vibe: Playful Rebellion
Eccentricists carry a quirky, irreverent energy that says:
* "I do things my way."
* "Normal is boring."
* "If you get it, you get it."
You're not chaotic; you're intentionally odd.

What Makes You Different
Eccentricists aren't just creative; they are defiantly unique.
You excel at:
✔ Creating your own aesthetic
You have a signature style that's unmistakably you.
✔ Making people laugh with your weirdness
Your humor is offbeat, clever, and unexpected.
✔ Expressing yourself without apology
You don't tone yourself down for anyone.
✔ Thinking outside every box
You question norms and explore alternatives.
✔ Turning strangeness into art
Your quirks become your creative voice.

Your Inner Engine
Savior Ne + Fi
You lead with possibility and personal authenticity. You thrive when you're exploring ideas and expressing your unique self.
Your Challenge: Demon Si/Te
You can struggle with tradition, structure, or efficiency. You may resist being conventional or predictable.

When You're at Your Best
You become the person who:
* redefines what's cool
* makes art that challenges norms
* inspires others to be themselves
* brings humor to the absurd
Your gift is originality. Your presence is permission to be weird.

When You're Growing
You learn to:
* balance freedom with responsibility
* appreciate the value of structure
* finish your wild ideas
* connect your quirks to a larger purpose
A balanced Eccentricist is a creative force — all the weird, with impact.

⭐ The Essence of the Eccentricist
"Creative quirk, playful originality, unconventional expression."
You don't just break the mold; you make a new one.
You are the human equivalent of a kaleidoscope.
`
    },
    {
        code: "Ne/Te",
        name: "The Storykeeper",
        family: "Ne-types",
        familyId: "ne",
        color: "var(--gradient-nt)",
        shortDescription: "Narrative intelligence, grounded communication, and meaning-making.",
        fullProfile: `
⭐ THE STORYKEEPER
The ENTP Jumper • Savior Ne/Te • Demon Si/Fi

You turn life into narrative.
Every experience becomes a story, every story becomes wisdom.
The Storykeeper is a master of meaning-making. You don't just observe the world; you interpret it, frame it, and share it. You have a gift for taking complex emotions and events and turning them into something everyone can understand. You're the narrator, the journalist, the one who helps us make sense of it all.
You are the storyteller, the commentator, the keeper of collective memory.

Core Vibe: Narrative Wisdom
Storykeepers carry a thoughtful, articulate energy that says:
* "Let me tell you what this means."
* "Here's the story behind the story."
* "This is how we make sense of it."
You're calm, grounded, and deeply communicative.

What Makes You Different
Storykeepers aren't just talkers; they are meaning-makers.
You excel at:
✔ Turning experiences into stories
You find the narrative thread in everything.
✔ Explaining complex ideas clearly
You make the confusing feel understandable.
✔ Providing context and perspective
You help people see the bigger picture.
✔ Communicating with sincerity
Your words feel genuine and trustworthy.
✔ Building worlds through narrative
You create entire universes with your storytelling.

Your Inner Engine
Savior Ne + Te
You lead with possibility and structure. You thrive when you're exploring ideas and organizing them into clear, compelling narratives.
Your Challenge: Demon Si/Fi
You can struggle with personal nostalgia or deep emotional introspection. You may resist dwelling on the past or getting lost in feelings.

When You're at Your Best
You become the person who:
* explains the world to others
* creates stories that resonate
* provides clarity in chaos
* preserves important narratives
Your gift is interpretation. Your presence is understanding.

When You're Growing
You learn to:
* honor your own emotions
* value personal history
* slow down and feel
* trust your inner voice
A balanced Storykeeper is a cultural anchor — all the wisdom, with heart.

⭐ The Essence of the Storykeeper
"Narrative wisdom, emotional sincerity, grounded communication."
You don't just tell stories; you give them meaning.
You are the human equivalent of a library.
`
    },
    {
        code: "Ne/Ti",
        name: "The Intellector",
        family: "Ne-types",
        familyId: "ne",
        color: "var(--gradient-nt)",
        shortDescription: "Analysis, logic, system-building, and strategic thought.",
        fullProfile: `
**Why this name fits this type**

This group has an extremely tight, unmistakable energetic signature — the clearest “thinking-dominant” type in the entire 32-type system so far.
Across all faces and vibes, here’s the shared pattern:

1. **Cognitive-first orientation**
These individuals project:
* analysis
* reasoning
* curiosity
* mental sharpness
* intellectual confidence
* comfort with abstract ideas
This type lives in their head more than any previous group.
Not dreamy (Dreamweaver), Not conceptual-creative (Visionary), Not narrative (Storykeeper), Not quirky-creative (Eccentricist).
This is pure cognition.

2. **Problem-solvers, theorists, strategists**
Group contains:
* economists
* philosophers
* political commentators
* CEOs and founders
* futurists
* scientists
* system theorists
* inventors
* public intellectuals
They are builders of explanations, frameworks, and strategic models.

3. **Serious, inquisitive emotional tone**
Their expressions trend toward:
* focus
* skepticism
* contemplation
* seriousness
* neutrality
* mild stoicism
They’re not charming, warm, rebellious, or artistic.
They’re thinking about something — always.

4. **Systems-level thinking**
This group specializes in:
* macro perspectives
* broad theories
* logic
* structure
* patterns
* connecting disparate fields
Their eyes communicate “I’m processing everything.”

5. **Low emotional display, high mental presence**
Compared to other types, they have the strongest cognitive engine.

**A personality defined by analysis, logic, system-building, strategic thought, and a dominant cognitive orientation.**
`
    },
    {
        code: "Ni/Fe",
        name: "The Influencer",
        family: "Ni-types",
        familyId: "ni",
        color: "var(--gradient-nf)",
        shortDescription: "High social magnetism, natural persuasion, and presence-driven impact.",
        fullProfile: `
**Why this name fits this type**

This group has an unusually consistent charisma signature — not soft like the Charmist, not intense like the Forcebringer, not eccentric, not intellectual-first.
Their vibe is social impact + persuasion + presence.
Here’s the breakdown of why this type is so distinct:

1. **High social magnetism**
Nearly every person here has:
* strong eye contact
* charismatic facial expressiveness
* visible social confidence
* “you could listen to them talk for hours” energy
But unlike entertainers, this group uses charisma to shape people, not just entertain them.

2. **Natural persuaders**
This set includes:
* magicians
* mentalists
* performers
* coaches
* speakers
* personalities
* interviewers
* social commentators
They influence thought, behavior, and emotion through communication, framing, and charisma.
This is the sharpest “people-influencing people” type yet.

3. **Flexible but not fluid**
Different from the Shapeshifter: they don’t morph — they persuade.
Different from the Visionary: they think socially, not abstractly.
Different from the Storykeeper: they communicate to move people, not just narrate.
Different from the Charmist: their charm has purpose, not just warmth.

4. **Presence-driven impact**
They project:
* confidence
* assertive friendliness
* strong expression
* approachability with edge
* a sense that they’re performing for an audience even off-stage
Not in a fake way — in a “my personality is my tool” way.

5. **Medium-agency, high-social agency**
They’re not the most intense or forceful type, but they excel at:
* persuasion
* influence
* coaching
* entertaining
* emotional reframing
* public presence
This is a people-mover personality.

**A personality defined by charisma, persuasion, social impact, and emotionally engaging presence.**
`
    },
    {
        code: "Ni/Fi",
        name: "The Iconoclast",
        family: "Ni-types",
        familyId: "ni",
        color: "var(--gradient-nf)",
        shortDescription: "Bold individuality, cultural imprint, and confident nonconformity.",
        fullProfile: `
**Why this name fits this type**

This group has one of the strongest and clearest identity signatures so far — a mix of bold individuality, cultural impact, stylistic edge, and personal distinctiveness.
They don’t blend in.
They don’t follow norms.
They stand apart — sometimes controversially, always memorably.
Here’s the shared pattern:

1. **Strong, unmistakable personal identity**
Nearly everyone here has:
* a striking, easily recognizable persona
* a crafted aesthetic
* a “you know who I am” face and presence
* a confident, self-defined image
They’re not shapeshifters.
They aren’t soft or warm-first.
They are defined by distinctiveness.

2. **High cultural footprint**
This group includes:
* actors with iconic roles
* musicians with signature sound + image
* comedians with unmistakable style
* founders who became personal brands
* thinkers and commentators who carved unique lanes
Their influence comes from being different, not blending.

3. **Nonconformity + edge**
Even the “clean-cut” members have a subtle nonconformist energy.
And others have outright rebellion, oddness, or extremes.
Across the board you see:
* bold eyes
* strong facial posture
* expressive individuality
* a vibe of “I do this my way”
But unlike The Maverick (self-made disruptor), this type’s edge is aesthetic + cultural, not operational/business-driven.

4. **Artistic + intellectual + stylistic fusion**
This group blends:
* creativity
* charisma
* intelligence
* intuition
* an “unusual but compelling” vibe
They aren’t eccentric for eccentricity’s sake like The Eccentricist.
They aren’t deep-feeling creatives like The Dreamweaver.
They aren’t pure thinkers like The Intellector.
They are boldly expressive identity-builders.

5. **Strong presence with emotional neutrality**
Their expressions tend to be:
* confident
* sharp
* poised
* self-assured
* subtly aloof
They command attention without trying to be charming, warm, or intense.

**A personality defined by bold individuality, cultural imprint, stylistic distinction, and confident nonconformity.**
`
    },
    {
        code: "Ni/Te",
        name: "The Strategist",
        family: "Ni-types",
        familyId: "ni",
        color: "var(--gradient-nt)",
        shortDescription: "Ambition, polished communication, tactical thinking, and intentional life design.",
        fullProfile: `
**Why this name fits this type**

This group has an extremely consistent energy pattern — goal-driven, polished, socially sharp, and mentally organized.
They combine ambition + communication skills + structured thinking, creating a very specific personality profile.
Here’s the breakdown:

1. **High ambition + goal orientation**
This entire group radiates:
* drive
* forward motion
* self-improvement
* built identities
* intentional life design
They are not dreamy, eccentric, chaotic, or purely charismatic.
Their vibe is focused and purpose-directed.

2. **Polished social intelligence**
Not warm like the Charmist.
Not cunning like an Influencer.
Not rebellious like the Iconoclast.
Their social presence is:
* professional
* articulate
* confident
* well-packaged
* persuasive in a controlled way
This is “executive-level social intelligence.”

3. **Practical thinkers**
Unlike the Intellector (abstract, systems-level), this group is:
* tactical
* applied
* pragmatic
* outcome-oriented
* action-focused
They ask: “What works? What gets results? What’s the optimal path?”
This is the key difference.

4. **Leadership + persuasion + structure**
They share an aura of calculated influence — not chaotic, not spontaneous.
Their authority comes from:
* optimized communication
* strategic framing
* confidence
* structured thinking
* clear personal brand identity

5. **Present, composed, and intentional**
Their facial expressions tend to be:
* organized
* centered
* deliberate
* aligned
* focused
* purposeful
They project the energy of people who architect their lives rather than drift through them.

**A personality defined by ambition, polished communication, tactical thinking, and intentional life design.**
`
    },
    {
        code: "Ni/Ti",
        name: "The Provocateur",
        family: "Ni-types",
        familyId: "ni",
        color: "var(--gradient-nt)",
        shortDescription: "Emotional intensity, radical honesty, cultural challenge, and catalytic impact.",
        fullProfile: `
**Why this name fits this type**

This group is one of the most unmistakably charged, impactful, and boundary-pushing sets so far. The shared energy is crystal clear:
They challenge, shock, awaken, provoke, and shake up culture, norms, psychology, spirituality, or society at large.
Here’s the pattern:

1. **High-voltage presence**
These individuals radiate:
* intensity
* conviction
* emotional charge
* a confrontational or catalytic aura
Not soft, not neutral — electrified.
This is a group of disruptors of thought and emotion.

2. **They provoke change**
Unlike the Iconoclast (style first), these individuals provoke through:
* ideas
* truth-telling
* art
* spiritual teachings
* performance
* activism
* radical honesty
Even the comedians here use humor to poke, prod, and expose social truths.
Their impact is transformational via confrontation.

3. **Emotional sharpness**
Most faces show:
* intensity
* tension
* deep seriousness
* “I have something to say”
* internal fire
* piercing eyes
They aren't balanced, gentle, mellow, or polished.
They’re raw, charged, and disruptive.

4. **Philosophical or artistic depth + sharp edges**
This group blends:
* spirituality
* psychology
* philosophy
* social critique
* artistic rebellion
* personal truth missions
They share visceral, emotional intensity beyond mere intellect.

5. **Not rebels without a cause — provocateurs with purpose**
Key distinction:
* The Maverick rebels to build
* The Iconoclast rebels to express
* The Provocateur rebels to awaken
This is the “wake-up-call” type.

**A personality defined by emotional intensity, radical honesty, cultural challenge, and catalytic personal impact.**
`
    },
    {
        code: "Se/Fe",
        name: "The Performer",
        family: "Se-types",
        familyId: "se",
        color: "var(--gradient-sf)",
        shortDescription: "Expressive energy, emotional presence, and physical charisma.",
        fullProfile: `
**Why this name fits this type**

This group has one of the clearest, most unmistakable profiles so far. The shared energy is expressive, bold, physical, emotional, and audience-facing.
They radiate presence, charisma, and a “watch me, feel me, experience me” vibe.
Here’s the breakdown:

1. **High expressiveness**
Everyone here shows big emotional bandwidth:
* bright smiles
* powerful eye contact
* animated expressions
* visible warmth or intensity
* “on-stage” energy even in still photos
This is the most outwardly expressive group we've seen.

2. **Natural entertainers**
This group is STACKED with people whose entire impact comes from performance:
* comedians
* actors with huge physical/emotional presence
* athletes with performative swagger
* musicians with flair
* YouTube entertainers
* motivational speakers with stage personality
Their influence flows from performance energy, not intellect, strategy, or identity politics.

3. **Physical presence**
Compared to every previous type, this group radiates the most embodied charisma:
* strong posture
* energetic faces
* athletic or powerful bodies
* dynamic textures in expression
Their charisma isn’t soft (Charmist), sarcastic (Influencer), or artistic-deep (Dreamweaver).
It’s energetic, lively, and physical.

4. **Emotional boldness**
They communicate using:
* humor
* excitement
* intensity
* passion
* sincerity
This type doesn’t hold back.
They project big emotion outward.

5. **Audience connection**
Most of these people are loved specifically because they:
* make people laugh
* inspire people
* energize crowds
* move audiences
* tell stories with their bodies
* perform on stages, screens, or arenas
Their power comes from engaging attention and emotion directly.

**A personality defined by expressive energy, emotional presence, physical charisma, and the ability to captivate audiences.**
`
    },
    {
        code: "Se/Fi",
        name: "The Celebrant",
        family: "Se-types",
        familyId: "se",
        color: "var(--gradient-sf)",
        shortDescription: "Aesthetic expression, radiant charm, emotional warmth, and joy.",
        fullProfile: `
**Why this name fits this type**

This group has a very clear, unmistakable pattern:
radiant, expressive, aesthetically-driven, emotionally uplifting, and socially joyful energy.
This is the most vibrant, glamorous, and aesthetics-forward type we’ve seen so far.
Here’s the breakdown:

1. **High aesthetic awareness**
Nearly everyone here has a strong focus on:
* beauty
* style
* presentation
* personal flair
* visual expression
* polished looks
Aesthetic identity is central.
But unlike the Iconoclast, this isn’t about rebellion — it’s about shine.

2. **Radiant emotional presence**
Consistent emotional signals:
* bright smiles
* upbeat energy
* warm expressiveness
* positivity
* “light up the room” vibe
They’re not calm like Storykeepers, not intense like Provocateurs, not strategic like Strategists.
They are emotionally uplifting.

3. **Celebration, joy, and human connection**
This group contains people whose careers center around:
* entertainment
* fun
* beauty
* music
* pop culture
* lifestyle
* joy
* inspiration
They make others feel good, bright, included, happy, or energized.

4. **Social charisma + approachability**
Their faces consistently show:
* friendliness
* relatability
* openness
* warmth
* emotional clarity
This is a softer, more glamorous version of Performer energy — less comedic intensity, more aesthetic sparkle.

5. **A “spotlight” type**
But unlike Performers (who command energy), this type radiates energy.
Their power comes from:
* beauty
* joy
* charm
* glow
* celebration
Think of them as ambassadors of brightness.

**A personality defined by aesthetic expression, radiant charm, emotional warmth, and a life centered around celebrating beauty, joy, and human connection.**
`
    },
    {
        code: "Se/Te",
        name: "The Enterpriser",
        family: "Se-types",
        familyId: "se",
        color: "var(--gradient-st)",
        shortDescription: "Action, production, practical ambition, and building real-world results.",
        fullProfile: `
**Why this name fits this type**

This group has a very consistent — and distinct from all previous types — energetic signature:
They radiate initiative, drive, action, production, and making things happen in the real world.
This is the most hands-on, active, and execution-oriented type so far.
Let’s break it down:

1. **High “doer” energy**
Everyone here projects the vibe of:
* taking action
* getting things done
* pushing forward
* building projects
* solving practical problems
* being constantly in motion
This group is kinetic, not conceptual or emotional.
These people move. They don’t sit around strategizing (Strategist) or entertaining (Performer) — they produce.

2. **Real-world impact > abstract ideas**
This differentiates them sharply from:
* The Intellector → abstract reasoning
* The Visionary → conceptual creativity
* The Storykeeper → narrative insight
* The Provocateur → emotional/philosophical disruption
This group is about practical, tangible, measurable output.

3. **High resilience + self-starting initiative**
Consistent facial cues:
* determination
* groundedness
* readiness
* confidence
* sturdy emotional tone
There’s less sparkle (Celebrant), less softness (Charmist), less eccentric weirdness (Eccentricist).
This is productive grit.

4. **Builders of career, brand, projects**
Massive cluster of:
* actors who built career longevity through work ethic
* creators with sustained output
* entrepreneurs
* physical performers/stunt creators
* fitness creators
This is a type that thrives in systems and sustained effort.

5. **Social but not performative**
Unlike The Performer:
* they are not loud
* not high-emotion
* not explosive personality
Their social energy is functional, not theatrical — “Let’s get to work. Let’s build. Let’s make progress.”

**A personality defined by action, production, practical ambition, and the drive to build real-world results.**
`
    },
    {
        code: "Se/Ti",
        name: "The Powerhouse",
        family: "Se-types",
        familyId: "se",
        color: "var(--gradient-st)",
        shortDescription: "Commanding presence, high agency, and physical/energetic intensity.",
        fullProfile: `
**Why this name fits this type**

This group has one of the most intense, high-drive, and impact-forward energetic signatures in the entire 32-type system.
Where earlier groups showed:
* expression (Performer)
* aesthetics (Celebrant)
* strategy (Strategist)
* action (Enterpriser)
THIS group embodies raw force + presence + leadership + physical/energetic dominance.
It is by far the strongest “high-agency + high-intensity + high-impact” cluster.
Here’s the consistent pattern:

1. **Dominant presence**
These individuals radiate:
* confidence
* command
* physical or energetic power
* “I walk into the room, the room changes” energy
This is the strongest aura group so far.

2. **High physicality (even when not athletes)**
Even the non-athletes have:
* strong jaws
* square features
* powerful eyes
* a “physical presence” even in still photos
They don’t look soft, gentle, or intellectual-first.
They look impact-first.
This is not purely about body size — it’s about force.

3. **Leadership energy**
These individuals often end up leading:
* teams
* movements
* countries
* communities
* industries
* fanbases
They project direction, authority, and momentum.
This is directive power.

4. **Focused intensity**
Their baseline emotional tone:
* decisive
* serious
* concentrated
* forward-leaning
* high conviction
Even the “warm” ones still radiate firmness and drive.

5. **Performance + discipline + dominance**
This group is the perfect blend of:
* Performer’s energy
* Forcebringer’s intensity
* Enterpriser’s action
* Strategist’s discipline
But not fully any of those — it’s something more commanding.
They don’t just act. They don’t just build. They don’t just charm.
They dominate spaces.

**A personality defined by commanding presence, high agency, physical and energetic intensity, and the instinct to lead through strength and momentum.**
`
    },
    {
        code: "Si/Fe",
        name: "The Humanitarian",
        family: "Si-types",
        familyId: "si",
        color: "var(--gradient-sf)",
        shortDescription: "Empathy, emotional sincerity, grounded values, and uplifting connection.",
        fullProfile: `
**Why this name fits this type**

This group carries an extremely consistent, recognizable, and unique energetic signature — one we haven’t used yet in the 32-type system:
They radiate warmth, empathy, grounded ethics, emotional maturity, and a desire to uplift people.
Not charisma-first. Not intensity-first. Not aesthetics-first. Not intellectual-first. Not performance-first.
This is heart-first.
Here’s the breakdown:

1. **Deep emotional sincerity**
Nearly everyone here conveys:
* kindness
* grounded compassion
* a gentle, steady emotional presence
* sincerity in expression
* “good intentions” energy
Even those known for bold careers show a softness + humanity in these portraits.

2. **Uplifting roles and archetypes**
This group includes:
* ethical leaders
* nurturing performers
* emotional storytellers
* spiritual/motivational figures
* connective entertainers
* artists with emotional depth
Their impact is rooted in emotionally uplifting connection, not shock, dominance, or showmanship.

3. **Gentle charisma, not explosive charisma**
Different from Charmist (light charm) or Performer (big-energy entertainment).
This group’s charisma is:
* warm
* empathetic
* considerate
* grounded
* emotionally safe
They’re “people you trust quickly.”

4. **Ethical + moral undertones**
Facial expressions consistently show:
* conscientiousness
* care
* emotional responsibility
* ethical awareness
* social sensitivity
They feel like people who genuinely care about people, not just influence them.

5. **Centered, calm presence**
Not volatile (Provocateur). Not dominant (Powerhouse). Not eccentric (Eccentricist). Not radiant-aesthetic (Celebrant). Not strategic (Strategist).
They’re stable, steady, emotion-forward, values-driven.

**A personality defined by empathy, emotional sincerity, grounded values, and the desire to uplift others through warmth and human connection.**
`
    },
    {
        code: "Si/Fi",
        name: "The Executor",
        family: "Si-types",
        familyId: "si",
        color: "var(--gradient-sf)",
        shortDescription: "Discipline, responsibility, reliability, and turning plans into outcomes.",
        fullProfile: `
**Why this name fits this type**

This group’s energy is exceptionally grounded, serious, practical, and responsibility-focused — unlike any other type we’ve defined so far.
Across the entire set, the shared pattern is crystal clear:
They are implementers, organizers, stabilizers, and carriers of duty.
Not emotional-first (Humanitarian). Not action-chaotic (Enterpriser). Not dominant-intense (Powerhouse). Not expressive (Performer). Not aesthetic (Celebrant). Not intellectual-theorist (Intellector).
This type is the backbone: decisive, steady, reliable, and results-driven.
Here’s how it breaks down:

1. **Strong sense of responsibility**
This group radiates:
* duty
* seriousness
* reliability
* “I take care of things” energy
* emotional restraint, but clear resolve

2. **Practical impact > expressive impact**
Unlike Enterprisers (who are high-energy doers), Executors are structured, methodical, and consistent.
They don’t move fast for excitement — they move correctly, effectively, and according to values or plans.
This group is pragmatic.

3. **Stable emotional tone**
Expressions here consistently show:
* calm
* restraint
* steadiness
* composure
* groundedness
Very few big smiles, very few dramatic expressions.
This is the steadiest emotional profile yet.

4. **Builders of order, systems, or legacy**
Their careers and vibes cluster around:
* institutions
* logistics
* governance
* operations
* structural creativity
* mastery of a craft over time
They excel where reliability meets competence.

5. **They execute rather than improvise**
Compared to:
* Strategist → plans
* Enterpriser → acts
* Powerhouse → dominates
* Humanitarian → supports
* Performer → entertains
* Visionary → imagines
The Executor does. Calmly, consistently, effectively — with minimal theatrics.

**A personality defined by discipline, responsibility, reliability, and the ability to turn plans into tangible, real-world outcomes.**
`
    },
    {
        code: "Si/Te",
        name: "The Guardian-Advocate",
        family: "Si-types",
        familyId: "si",
        color: "var(--gradient-st)",
        shortDescription: "Principled leadership, ethical responsibility, advocacy, and community commitment.",
        fullProfile: `
**Why this name fits this type**

This group has a very distinct and totally unique energetic signature in your 32-type ecosystem.
They radiate principle, protection, moral backbone, advocacy, and community-minded responsibility.
Not soft like The Humanitarian. Not duty-focused like The Executor. Not strategist-driven. Not intense like The Powerhouse. Not charismatic-first. Not artistic-first.
This is the type that stands for something — publicly, consistently, and with conviction.
Here’s the breakdown:

1. **Strong moral and ethical orientation**
Nearly everyone here projects:
* seriousness of purpose
* ethical clarity
* “I stand for what I believe” energy
* a grounded, responsible face
* steady eyes
* calm conviction
These are values-forward decision makers.

2. **Advocates, educators, and societal stewards**
This group is full of people whose work centers around:
* public communication
* social responsibility
* politics
* journalism
* education
* community leadership
* principled lifestyle guidance
Their core trait is guidance + protection + responsibility for others.

3. **Calm but strong presence**
Unlike The Powerhouse (commanding physicality), this type is calm, rational, and ethically anchored.
Compare emotional tone:
* not high-energy
* not flashy
* not rebellious
* not quirky
* not intense
* not chaotic
They all have centered, composed, thoughtful expressions.

4. **Community-first thinking**
These individuals often influence:
* families
* communities
* institutions
* civic spaces
* public discourse
They naturally lean toward roles of:
* protector
* advisor
* guide
* advocate
* principled communicator
This is ethical stewardship.

5. **“Guardian of values and communities” is the unique vibe**
The distinct difference from “Executor”:
* Executors = disciplined, productive doers
* Guardian-Advocates = socially responsible protectors of people + values
This group stands up, speaks out, represents, defends.

**A personality defined by principled leadership, ethical responsibility, advocacy for others, and a calm yet powerful commitment to community and truth.**
`
    },
    {
        code: "Si/Ti",
        name: "The Custodian",
        family: "Si-types",
        familyId: "si",
        color: "var(--gradient-st)",
        shortDescription: "Steadiness, structure, humility, and practical responsibility.",
        fullProfile: `
**Why this name fits this type**

Even with a small sample size, the energetic signature is very clear — especially with your note that this group is Si/Ti, which aligns perfectly with what the faces already show:
This is the most quietly responsible, detail-minded, steady, practical, behind-the-scenes stabilizer type in the entire system.
They aren’t flashy. They aren’t expressive. They aren’t high-agency disruptors. They aren’t performers or strategists or advocates.
They’re reliable, consistent, methodical, and duty-oriented in a low-drama way.
Here’s the breakdown:

1. **Quiet steadiness**
All three radiate:
* calm
* emotional neutrality
* stability
* groundedness
The opposite of chaotic or showy.
Their strength is reliable consistency.

2. **Practical, detail-focused minds**
Si/Ti fits the visual vibe:
* structured thinkers
* self-contained
* exacting
* good with details, systems, routines
They are the people who keep things functioning smoothly.

3. **Low-ego presence**
Unlike Strategists (polished), Powerhouses (dominant), or Iconoclasts (bold aesthetic), this type is humble, unobtrusive, quietly capable.

4. **Guarding order, structure, and continuity**
This is the type that:
* preserves what works
* maintains systems
* organizes environments
* keeps operations stable
* ensures consistency
Their energy is protective but non-assertive — a caretaker of structure.

5. **The missing archetype in your 32-type system**
Up to now, you’ve had action types, emotional types, charismatic types, artistic types, visionary types, intense types, builders, disruptors, advocates.
But you haven’t yet had the quiet, grounded, stabilizing, routine-keeping, detail-preserving archetype.
This group fills that gap perfectly.

**A personality defined by steadiness, structure, humility, practical responsibility, and the quiet maintenance of order and continuity.**
`
    },
    {
        code: "Te/Ne",
        name: "The Commander",
        family: "Te-types",
        familyId: "te",
        color: "var(--gradient-nt)",
        shortDescription: "Outspoken leadership, direct communication, and assertive presence.",
        fullProfile: `
**Why this name fits this type**

This group’s energy is powerful, directive, outspoken, commanding, and assertive — but in a way that is social, public, vocal, and leading-from-the-front rather than physical (Powerhouse) or ethical (Guardian-Advocate).
This is the “strong voice in the room” type.
Here’s the breakdown:

1. **High assertiveness + high social presence**
Everyone here radiates:
* confidence
* strength in expression
* boldness
* direct communication
* “I say what needs to be said” energy
This group talks loudly, acts decisively, and leads boldly.

2. **Directive leadership (not soft leadership)**
Unlike Humanitarian (warm), Guardian-Advocate (ethical), Strategist (polished), or Executor (dutiful):
This group leads through force of personality.
They don’t ask — they tell.
They don’t persuade — they declare.
They don’t accommodate — they command.

3. **Outspoken, unapologetic, often confrontational**
Consistent emotional tone:
* frankness
* blunt honesty
* intense expression
* edge
* confidence bordering on intimidation
Even the friendlier faces still carry a commanding, take-charge presence.
The comedians here have intense, dominating comedic delivery, not soft humor.

4. **Strong boundary-setters**
This group excels at:
* confrontation
* debate
* criticism
* direction
* leadership under pressure
* holding their ground
They are verbal leaders who take command of the room.

5. **“My voice shapes the space around me”**
This is THE public-facing, outspoken, directive personality.
This type speaks, critiques, directs, commands, and drives action through presence + voice.

**A personality defined by outspoken leadership, direct communication, assertive presence, and the ability to take charge through force of personality.**
`
    },
    {
        code: "Te/Ni",
        name: "The Crusader",
        family: "Te-types",
        familyId: "te",
        color: "var(--gradient-nt)",
        shortDescription: "Mission-driven conviction, moral intensity, and public advocacy.",
        fullProfile: `
**Why this name fits this type**

This group has one of the strongest, clearest, and most emotionally-charged patterns of ANY type in the 32-type system.
They all radiate mission-driven intensity, moral fire, public conviction, and a willingness to fight for what they believe — sometimes constructively, sometimes controversially.
This is NOT:
* The Commander (directive leadership through authority)
* The Provocateur (shock + disruption)
* The Guardian-Advocate (ethical, calm stewardship)
* The Strategist (polished influence)
* The Powerhouse (dominant physical/energetic agency)
This type leads through PURPOSE.
They’re fueled by ideology, justice, truth, exposing wrongs, or pushing society forward (or backward) through sheer conviction.
Here’s the breakdown:

1. **Mission-driven expressions**
Every face shows:
* seriousness
* conviction
* moral resolve
* “I’m here for a reason” energy
The shared thread: a burning mission — even wildly different missions.

2. **They’re fighters — in the ideological sense**
This group includes:
* activists
* whistleblowers
* motivational leaders
* spiritual teachers
* justice-oriented politicians
* crusading journalists
* transformative coaches
* confrontational comedians
* values-oriented public figures
They are defined by what they stand for.

3. **Emotional intensity toward PURPOSE, not chaos**
This is critical.
Unlike the Provocateur (emotional fire aimed at disruption), this type’s fire is aimed at:
* justice
* truth
* reform
* awakening
* exposing
* protecting
* leading movements
They’re directive + emotional + mission-centered.

4. **They speak from the chest, not the head**
Not intellectual (Intellector). Not pragmatic (Executor). Not aesthetic (Celebrant). Not comedic performer (Performer).
Their communication is:
* passionate
* grounded in beliefs
* socially charged
* purpose-forward

5. **“I will fight for this” energy**
This is the distinguishing signature.
They’re not just leaders. They’re crusaders — people who step into conflict on behalf of something bigger.
Whether they’re right or wrong, benevolent or harmful, calm or explosive — their identity is tied to a cause.

**A personality defined by mission-driven conviction, moral intensity, public advocacy, and the instinct to fight for causes, truth, and transformation.**
`
    },
    {
        code: "Te/Se",
        name: "The Starmaker",
        family: "Te-types",
        familyId: "te",
        color: "var(--gradient-st)",
        shortDescription: "Poised charisma, cultural taste-making, and magnetic polish.",
        fullProfile: `
**Why this name fits this type**

This group has one of the most glamorous, public-facing, and charisma-saturated energetic patterns in your entire 32-type universe — but not in the same way as Celebrant or Performer.
Where Celebrant = radiant, joyful, aesthetic
Where Performer = loud, expressive, comedic/energetic
Where Iconoclast = bold individuality
Where Powerhouse = dominance
Where Commander = forceful voice
The Starmaker is something different:
It’s the archetype of polish, poise, brand presence, cultural influence, and high-level personal magnetism — the people who don’t just shine, but shape what “shine” means to others.
This is the “celebrity essence” type — not the loudest, not the brightest emotionally, but the most curated, iconic, and aspirational.
Here’s the breakdown:

1. **Highly curated presence**
Every person here projects:
* refinement
* poise
* polished self-presentation
* clean brand identity
* visual consistency
* image awareness
* elegance or stylish confidence
These aren’t “raw performers” or “chaotic stars.” They’re iconic personalities with crafted presences.

2. **Cultural taste-makers**
This type is full of people who define or shape:
* fashion
* aesthetics
* entertainment culture
* lifestyle trends
* celebrity identity itself
* aspirational “look + vibe”
They influence culture visually and energetically.
This is not the Celebrant (joy/aesthetic brightness) — this is taste, style leadership, brand power.

3. **Cool charisma (not warm, not intense)**
Their faces show:
* controlled expression
* subtle confidence
* cool charm
* emotional moderation
* grounded magnetism
No excess emotion. No chaotic intensity. No comedic exaggeration.
They all seem composed in front of an audience, not overwhelmed by it.

4. **Quiet star power**
This is not Performer, Powerhouse, Commander, Iconoclast, Crusader, Humanitarian, or Strategist.
The Starmaker is charisma rooted in:
* aura
* presence
* visual & energetic polish
* cultural expressiveness
* aspirational brand identity
They feel like icons, not just personalities.

5. **The “celebrity archetype” done right**
This group is filled with people who embody:
* influence
* beauty
* style
* aspirational energy
* on-camera mastery
* a sense of being “glossed,” “finished,” or “ready for the poster”
Not shallow — just visually and socially magnetic in a uniquely composed way.

**A personality defined by poised charisma, cultural taste-making, magnetic polish, and an iconic, aspirational presence that shapes how others define “style” and “star power.”**
`
    },
    {
        code: "Te/Si",
        name: "The Authority",
        family: "Te-types",
        familyId: "te",
        color: "var(--gradient-st)",
        shortDescription: "Expertise, high standards, competence, and credibility.",
        fullProfile: `
**Why this name fits this type**

This group has one of the strongest, most unmistakable signatures of any cluster so far:
They radiate command, expertise, standards, credibility, and high expectations.
Not dominance-by-force (Powerhouse). Not mission intensity (Crusader). Not outspoken fire (Commander). Not strategic polish (Strategist). Not ethical steadiness (Guardian-Advocate). Not execution (Executor).
This type leads through credibility, mastery, competence, and the expectation that others rise to their level.
Here’s the breakdown:

1. **Expert energy**
This group is filled with people whose reputations are built on:
* mastery of craft
* deep experience
* technical or domain authority
* being “the one who actually knows what they’re talking about”
* setting the bar for others
Even entertainers here radiate “I’m a pro.”

2. **Command through competence, not volume**
Different from Commander:
Commanders talk loudly and direct people.
Authorities don’t need to shout.
Their entire vibe communicates: “I’ve done this long enough. I know what’s right. I know what works.”
That is Authority Energy.

3. **High standards**
Facial cues across the set:
* evaluating eyes
* slight seriousness
* composed posture
* firm facial lines
* level-headed focus
They look like people who:
* expect competence
* expect responsibility
* expect performance
* expect effort
They are the “this isn’t good enough yet” archetype — but in a grounded, expert-driven way.

4. **Gravitas, even in humor**
Comedic figures here radiate weight behind the humor.
It’s not chaotic humor. It’s seasoned, experienced, authoritative humor.

5. **Leadership without theatrics**
This type has:
* less polish than Starmaker
* less intensity than Powerhouse
* less emotion than Humanitarian
* less charm than Charmist
* less rebellion than Iconoclast
* less flamboyance than Performer
Instead, they’re solid, reliable, the senior in the room, the kind of people who others look at before making a decision.

**A personality defined by expertise, high standards, competence, credibility, and the ability to lead through mastery rather than noise.**
`
    },
    {
        code: "Ti/Ne",
        name: "The Sage",
        family: "Ti-types",
        familyId: "ti",
        color: "var(--gradient-nt)",
        shortDescription: "Wisdom, reflection, depth, and intellectual calm.",
        fullProfile: `
**Why this name fits this type**

This group has one of the most coherent, unmistakable, and intellectually/spiritually mature energy signatures in your entire 32-type system.
The pattern is extremely clear:
They radiate wisdom, knowledge, insight, reflection, and a calm mastery of ideas.
They’re not strategic (Strategist), logical-intense (Intellector), visionary-creative (Visionary), ethical-steward (Guardian-Advocate), intense/emotional (Provocateur), dominant (Powerhouse), expressive (Performer), rebellious (Iconoclast), or aesthetic (Celebrant).
This type is wisdom-first, not intelligence-first.
Here’s the breakdown:

1. **Intellectual calm, not intellectual force**
These individuals don’t come off as “fighters” or “strategists” — they come off as thinkers, teachers, reflectors.
They engage the world through insight, not dominance or persuasion.

2. **Spiritual or philosophical undertone**
So many of them have a reflective, depth-oriented gaze.
This group emphasizes inner understanding, not outer force.

3. **Humble mastery**
Their facial energy shows:
* humility
* gentleness
* openness
* curiosity
* introspection
* emotional subtlety
Even the more visually intense faces still project a thinking-first orientation.
The Sage is wisdom + perspective.

4. **Quiet influence**
Unlike Commanders or Influencers, their power is soft:
* through books
* through research
* through philosophy
* through science
* through teaching
* through reflection
* through insight
Not persuasion. Not charisma. Not dominance. Not aesthetics.
Wisdom.

5. **Emotional neutrality + inner depth**
Their expressions trend toward:
* calm
* neutrality
* introspective stillness
* contemplative gaze
Very little flashy expressiveness. Very little chaos. Very little performance.
This is the highest internal-processing type in the system.

**A personality defined by wisdom, reflection, depth, intellectual calm, and a life centered around understanding truth and sharing insight.**
`
    },
    {
        code: "Ti/Ni",
        name: "The Master",
        family: "Ti-types",
        familyId: "ti",
        color: "var(--gradient-nt)",
        shortDescription: "Disciplined skill, applied excellence, and lifelong refinement.",
        fullProfile: `
**Why this name fits this type**

This group has one of the clearest, strongest, and most unified energetic signatures of ANY type in your entire 32-type system.
They radiate skill, craftsmanship, discipline, precision, applied expertise, and mastery-through-practice.
Not intellectual like The Sage. Not intense like The Powerhouse. Not forceful like The Commander. Not expressive like The Performer. Not aesthetic like The Starmaker. Not strategic like The Strategist.
This is the type defined by DOING something incredibly well — and dedicating their life to that craft.
Here’s how we know:

1. **Deeply developed skill orientation**
This type excels through long-term focused practice, not through personality, vision, charm, or emotion.

2. **Seriousness + technical excellence**
Notice the facial expressions:
* concentrated
* composed
* precise
* thoughtful
* disciplined
* occasionally stern
They look like people who train, practice, refine, iterate, and hone.
No chaos. No flamboyance. No expressive emotional waves.
Just focus + discipline.

3. **Applied intelligence (not theoretical intelligence)**
Compared to The Sage (wisdom), The Intellector (abstract logic), The Visionary (conceptual creativity), The Master is about practical competence.
They are defined by applied excellence, not ideas alone.

4. **High repetition + refinement + routine energy**
These people have the vibe of:
* waking up and doing the work
* practicing a skill for decades
* perfecting something through consistency
* self-discipline at an extreme level
That is Master energy.

5. **Not emotional, not chaotic, not dramatic**
This group’s emotional tone:
* calm
* steady
* disciplined
* internal
* purposeful
They don’t radiate passion outwardly (Provocateur), nor dominance (Powerhouse), nor delight (Celebrant), nor moral conviction (Crusader).
They radiate craft.

**A personality defined by disciplined skill, applied excellence, lifelong refinement, and the calm confidence of someone who has devoted themselves fully to mastering a craft.**
`
    },
    {
        code: "Ti/Se",
        name: "The Titan",
        family: "Ti-types",
        familyId: "ti",
        color: "var(--gradient-st)",
        shortDescription: "Resilience, stoic strength, hardened will, and endurance.",
        fullProfile: `
**Why this name fits this type**

This group has one of the strongest, most force-forward, and unyielding energy signatures in your entire 32-type system so far.
While Powerhouse was about presence, and Master was about craft, and Commander was about voice,
The Titan is about RESILIENCE, GRIT, ENDURANCE, AND UNBREAKABLE WILL.
This group radiates unyielding toughness, internal steel, and an instinct to endure, fight, and survive.
They are defined not just by strength, but by hardness, durability, and tenacity.
Here’s the breakdown:

1. **Extreme resilience + toughness**
Everyone in this group gives off:
* hardened eyes
* intensity beneath the surface
* “I’ve been through things” energy
* emotional metal
* internal fortitude
* weathered strength
This is battle-tested energy — physical, emotional, or psychological.

2. **Stoic endurance**
Facial tone across the board:
* serious
* grounded
* controlled
* no wasted motion
* no unnecessary expression
* self-contained power
Not angry. Not chaotic. Just tough.
Their instincts are: endure → persist → overcome → withstand.

3. **Action-tempered, not action-seeking**
Unlike Performers or Enterprisers, this type does not act from enthusiasm.
They act from:
* duty
* grit
* necessity
* inner strength
* unshakeable willpower
They feel like people who become more dangerous the more pressure you put on them.

4. **Hard-edged maturity**
This is not youthful toughness.
This is:
* veteran toughness
* seasoned judgment
* scars-into-strength energy
* “I rely on myself” mindset
Even the younger faces show premature hardness — the type that carries weight well.

5. **Power without flash**
Unlike Powerhouse, Commander, Crusader, Iconoclast, or Performer, Titans are quiet weapons.
Their intensity is internal, not external.
They feel like the type who:
* hold the line
* protect the perimeter
* take the hit and keep going
* do the impossible because they refuse to stop
This is willpower embodied.

**A personality defined by resilience, stoic strength, hardened will, and the ability to endure and overcome through sheer internal fortitude.**
`
    },
    {
        code: "Ti/Si",
        name: "The Innovator",
        family: "Ti-types",
        familyId: "ti",
        color: "var(--gradient-st)",
        shortDescription: "Curiosity, experimentation, inventive thinking, and creative problem-solving.",
        fullProfile: `
**Why this name fits this type**

This group has an extremely clean, coherent, and unmistakable energetic signature — a blend of curiosity, experimentation, original thinking, and forward-looking creativity.
They’re not wisdom-first like The Sage, intensity-first like The Titan, craft-first like The Master, charisma-first like The Performer or Starmaker, moral-first like The Crusader, or strategic-first like The Strategist.
This type is defined by ideas, invention, experimentation, and imaginative problem-solving.
They look at the world and think: “What could we build? What could we improve? What could we reimagine?”
Here’s the breakdown:

1. **Curiosity-driven minds**
They share a “what if” mentality — the core of innovation.

2. **Creative thinkers, not artists**
They’re not artistic-emotional like The Dreamweaver. They’re creative in an analytical, problem-solving way.
Faces show:
* alertness
* curiosity
* mental activity
* subtle enthusiasm
* “building something in their head” expressions
They look like people whose brains are always online.

3. **Forward-looking orientation**
This type constantly orients toward:
* future possibilities
* redesigning systems
* questioning assumptions
* improving or upgrading life
* inventing or reimagining solutions
This is inventive ambition, not competitive ambition.

4. **Gentle confidence (not force-based leadership)**
Unlike Commanders or Powerhouses or Titans, this type leads through:
* ideas
* innovation
* creativity
* inspiration
Their expressions are generally:
* calm
* open
* curious
* thoughtful
They don’t command or dominate — they propose, build, and innovate.

5. **A blend of intellect + creativity**
But not pure abstract logic like The Intellector. Not pure wisdom like The Sage.
This type mixes:
* imagination
* experimentation
* problem-solving
* tinkering
* curiosity
* unconventionality
This is engineering creativity, scientific creativity, life-hack creativity, philosophical creativity — all under one umbrella.

**A personality defined by curiosity, experimentation, inventive thinking, and the desire to reshape systems, ideas, and the future through creative problem-solving.**
`
    }
];
