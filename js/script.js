// ==============================
// Algemene helpers
// ==============================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


// ==============================
// Scroll progress + header
// ==============================

function updateScroll() {
    const height = document.documentElement.scrollHeight - innerHeight;
    const progress = height ? (scrollY / height) * 100 : 0;

    $('#progress').style.width = `${progress}%`;
    document.body.classList.toggle('scrolled', scrollY > 30);
}

addEventListener('scroll', updateScroll, { passive: true });

updateScroll();


// ==============================
// Hoofdstukken
// ==============================

const sections = $$('section[data-chapter]');

const chapterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $('#chapter').textContent = entry.target.dataset.chapter;
            }
        });
    },
    {
        threshold: 0.3
    }
);

sections.forEach((section) => {
    chapterObserver.observe(section);
});


// ==============================
// Labels / verborgen uitleg
// ==============================

const labelCopy = {
    transport: {
        title: 'Vliegen voor snelle trends',
        copy: 'Om de nieuwste internettrends binnen een paar dagen in de winkel te krijgen, maken populaire kledingmerken steeds vaker gebruik van <strong>snelle luchtvracht</strong>. Een kledingstuk invliegen stoot tot <strong>10 keer meer CO₂</strong> uit dan vervoer per schip. Daarnaast wordt tot wel de helft van alle online bestelde kleding teruggestuurd. Omdat het controleren en opnieuw inpakken te duur is, worden miljoenen gloednieuwe retouren <strong>direct verbrand of weggegooid</strong>.'
    },
    water: {
        title: 'Wat kost die mooie kleur?',
        copy: 'Achter het verven van onze kleding schuilt een grote ecologische ramp. Wereldwijd veroorzaakt de textielindustrie maar liefst <strong>20% van alle industriële watervervuiling</strong>. In landen als Bangladesh en China worden giftige stoffen en <strong>zware metalen</strong> zoals lood en chroom vaak rechtstreeks, ongezuiverd in lokale rivieren geloosd. Hierdoor veranderen waterwegen letterlijk van kleur mee met de nieuwste modetrends. Dit chemische afvalwater verwoest het onderwaterleven en vervuilt het <strong>drinkwater van miljoenen omwonenden</strong>.'
    },
    work: {
        title: 'De mens achter de naaimachine',
        copy: 'Ongeveer 80% van al het werk in kledingfabrieken wordt gedaan door <strong>jonge vrouwen</strong> die vaak meer dan 12 uur per dag werken. Om de kleding zo goedkoop mogelijk te houden, krijgen zij zelden een eerlijk loon en ontbreken basisrechten zoals een veilige werkplek. Door het constante werk in stoffige ruimtes en het werken met sterke chemicaliën krijgen veel naaisters al op jonge leeftijd last van <strong>ernstige gezondheidsproblemen</strong>.'
    },
    waste: {
        title: 'Onze kleding op een buitenlandse afvalberg',
        copy: 'Veel kleding die wij netjes <strong>inzamelen of doneren</strong>, belandt niet in een tweedehandswinkel maar wordt in grote balen geëxporteerd naar landen in <strong>Afrika en Zuid-Amerika</strong>. Daar komen zo veel kleren tegelijk aan dat lokale markten het niet meer kunnen verwerken. <strong>Meer dan 40%</strong> is bovendien van zo’n slechte kwaliteit dat het meteen op illegale afvalstorten of in de oceaan belandt, waar de synthetische stoffen nog <strong>honderden jaren</strong> blijven liggen.'    },
    fiber: {
        title: 'Olie in je kledingkast',
        copy: 'Meer dan de helft van al onze kleding wordt vandaag gemaakt van polyester, een synthetische stof die rechtstreeks uit <strong>fossiele aardolie</strong> wordt gewonnen. Bij elke wasbeurt komen er gemiddeld <strong>700.000 microplastics</strong> vrij uit één enkel kledingstuk. Deze minuscule plastic deeltjes spoelen zo via het riool de oceaan in. Ze breken niet af, worden opgegeten door vissen en belanden via de voedselketen uiteindelijk <strong>op ons eigen bord</strong>.'
    }
};
const labelSources = {
    water: [
        {
            name: 'UNEP — chemicaliën in textiel',
            url: 'https://wedocs.unep.org/handle/20.500.11822/48705'
        },
        {
            name: 'UNEP — textiel en afvalwater',
            url: 'https://open.unep.org/docs/gef/PIF/10523_PIF.pdf'
        }
    ],
    fiber: [
        {
            name: 'Changing Markets — synthetische vezels',
            url: 'https://changingmarkets.org/report/synthetics-anonymous-fashion-brands-addiction-to-fossil-fuels/'
        },
        {
            name: 'Napper et al. — vezels bij het wassen',
            url: 'https://doi.org/10.1021/es602339x'
        }
    ],
    transport: [
        {
            name: 'Transport & Environment — luchtvracht',
            url: 'https://www.transportenvironment.org/uploads/files/2006-06_aviation_clearing_the_air_myths_reality_0.pdf'
        },
        {
            name: 'EEA — vernietiging van retouren',
            url: 'https://www.eea.europa.eu/en/analysis/publications/the-destruction-of-returned-and-unsold-textiles-in-europes-circular-economy/'
        }
    ],
    work: [
        {
            name: 'Clean Clothes Campaign — vrouwen in de kledingindustrie',
            url: 'https://cleanclothes.org/file-repository/ccc_dec2019_luginbuhl_lw_gender.pdf'
        },
        {
            name: 'ILO — veiligheid in de textielsector',
            url: 'https://www.ilo.org/resource/safety-and-health-textiles-clothing-leather-and-footwear'
        }
    ],
    waste: [
        {
            name: 'The OR Foundation — afval bij Kantamanto',
            url: 'https://theor.org/work/dead-white-mans-clothes'
        },
        {
            name: 'EEA — export van gebruikte kleding',
            url: 'https://www.eea.europa.eu/en/analysis/publications/eu-exports-of-used-textiles'
        }
    ]
};
window.toonLabel = function (button) {
    const key = Object.keys(labelCopy).find((name) =>
        button.classList.contains(name)
    );

    if (!key) return;

    const popup = document.getElementById('labelExplain');
    const sourcesElement = document.getElementById('labelExplainSources');

    const labelColors = {
        transport: '#9b72b3',
        water: '#7eb5cc',
        work: '#f06432',
        waste: '#ed3681',
        fiber: '#609858'
    };

    popup.style.setProperty('--label-tape-color', labelColors[key]);
    document.getElementById('labelExplainTitle').textContent =
        labelCopy[key].title;
    document.getElementById('labelExplainCopy').innerHTML =
        labelCopy[key].copy;

    const sources = labelSources[key] || [];
    sourcesElement.innerHTML =
        '<span>Bronnen: </span>' +
        sources.map((source) =>
            `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>`
        ).join(' · ');

    popup.hidden = false;
};

// ==============================
// Water quiz
// ==============================
const zoomSlider = $('#zoom');

zoomSlider.addEventListener('input', (event) => {
    const slider = event.target;
    const value = Number(slider.value);
    const progress = ((value - 6000) / 9000) * 100;

    slider.style.setProperty('--slider-progress', `${progress}%`);
    slider.setAttribute(
        'aria-valuetext',
        `${value.toLocaleString('nl-NL')} liter`
    );

    $('#sliderReadout').textContent =
        `Jouw schatting: ${value.toLocaleString('nl-NL')} liter`;

    // Verberg het resultaat zolang de bezoeker nog aan het schuiven is.
    $('.water-quiz').classList.remove('is-correct');
    $('#quizStatus').hidden = true;
    $('#quizFeedback').textContent =
        'Laat los om je antwoord te controleren.';
});

zoomSlider.addEventListener('change', (event) => {
    const value = Number(event.target.value);
    const distance = Math.abs(value - 12000);
    const correct = value === 12000;

    $('.water-quiz').classList.toggle('is-correct', correct);
    $('#quizStatus').hidden = !correct;

    if (correct) {
        $('#quizFeedback').textContent = '';
    } else if (distance <= 1500 || value === 9000) {
        $('#quizFeedback').textContent =
            'Je bent dichtbij — nog een klein stukje schuiven.';
    } else if (value < 12000) {
        $('#quizFeedback').textContent =
            'Je schatting is nog wat laag.';
    } else {
        $('#quizFeedback').textContent =
            'Je schatting is wat aan de hoge kant.';
    }
});

// ==============================
// Materialen
// ==============================

const materials = {

    cotton: {
        title: 'Katoen (Natuurlijk)',
        art: 'Katoen 2.png',
        artAlt: 'Katoenbloem',

        text:
            'Katoen is natuurlijk, maar de teelt vraagt veel water en landbouwgrond. Ook pesticiden kunnen schadelijk zijn voor boeren en omwonenden.',

        notes: [
            'Veel water',
            'Pesticiden',
            'Arbeidsrisico'
        ],

        facts: [
            [
                'Enorm land- & waterverbruik',
                'Katoenteelt bedekt slechts 2,5% van alle landbouwgrond wereldwijd, maar slokt gigantische hoeveelheden water en land op.'
            ],
            [
                'Pesticiden',
                'Katoen is verantwoordelijk voor zo’n 16% van het wereldwijde gebruik van bestrijdingsmiddelen. Dat put de bodem en lokale ecosystemen uit.'
            ],
            [
                'Impact op de mens',
                'Lokale boeren en omwonenden kunnen in contact komen met giftige landbouwmiddelen, met ernstige gezondheidsproblemen tot gevolg.'
            ]
        ]
    },

    poly: {
        title: 'Polyester',
        art: null,
        artAlt: '',

        text:
            'Polyester wordt gemaakt uit aardolie. Het breekt niet natuurlijk af en laat bij het wassen microplastics los.',

        notes: [
            'Aardolie',
            'Microplastics',
            'Chemische verwerking'
        ],

        facts: [
            [
                'Aardolie als basis',
                'Polyester wordt gemaakt van fossiele brandstoffen. Jaarlijks is er wereldwijd meer dan 300 miljoen vaten olie nodig voor synthetische kleding.'
            ],
            [
                'Microplastics & afval',
                'Polyester breekt niet natuurlijk af. Bij elke wasbeurt komen er bovendien duizenden microplastics via het afvalwater in de oceaan terecht.'
            ],
            [
                'Impact op de mens',
                'Arbeiders in de chemische verwerking ademen schadelijke dampen in zonder passende bescherming.'
            ]
        ]
    },

    wool: {
        title: 'Wol (Dierlijk)',
        art: 'wol texture.png',
        artAlt: 'Grote pluk wolvezels',

        text:
            'Wol is een dierlijke vezel. De impact hangt af van de ruimte voor schapen en de manier waarop wol wordt gewassen en verwerkt.',

        notes: [
            'Landgebruik',
            'Broeikasgassen',
            'Chemische verwerking'
        ],

        facts: [
            [
                'Groot landgebruik',
                'Voor het houden van schapen zijn enorme oppervlaktes weidegrond nodig. Dat kan leiden tot ontbossing en bodemerosie.'
            ],
            [
                'Broeikasgassen',
                'De veehouderij stoot methaangas uit, dat sterk bijdraagt aan de opwarming van de aarde.'
            ],
            [
                'Chemisch verwerken',
                'Het schoonmaken en verwerken van ruwe wol vraagt energie, water en chemicaliën die lokaal water kunnen vervuilen.'
            ]
        ]
    }
};


// Materiaal tabs
$$('.mat-tabs button').forEach((button) => {
    document.querySelector('.mat-tabs button[aria-pressed="true"]')?.click();
    button.onclick = () => {
        const materialFactSources = {
            cotton: [
                [
                    {
                        name: 'EEA — water- en landgebruik van textiel',
                        url: 'https://www.eea.europa.eu/en/analysis/publications/textiles-and-the-environment-the-role-of-design-in-europes-circular-economy-1'
                    }
                ],
                [
                    {
                        name: 'PAN UK — pesticiden in de katoenteelt',
                        url: 'https://www.pan-uk.org/site/wp-content/uploads/Cottons-chemical-addiction-FINAL-LOW-RES-2017.pdf'
                    }
                ],
                [
                    {
                        name: 'PAN UK — risico’s van pesticiden',
                        url: 'https://www.pan-uk.org/site/wp-content/uploads/Cottons-chemical-addiction-FINAL-LOW-RES-2017.pdf'
                    }
                ]
            ],
            poly: [
                [
                    {
                        name: 'Changing Markets — synthetische vezels en fossiele brandstoffen',
                        url: 'https://changingmarkets.org/report/synthetics-anonymous-fashion-brands-addiction-to-fossil-fuels/'
                    }
                ],
                [
                    {
                        name: 'UNEP FI — microvezels uit polyesterwas',
                        url: 'https://www.unepfi.org/wordpress/wp-content/uploads/2024/12/White-Paper-on-Pollution-UNEP-FI-Nov-2024-D8.pdf'
                    }
                ],
                [
                    {
                        name: 'Changing Markets — synthetische vezels',
                        url: 'https://changingmarkets.org/report/synthetics-anonymous-fashion-brands-addiction-to-fossil-fuels/'
                    }
                ]
            ],
            wool: [
                [
                    {
                        name: 'FAO — klimaatimpact van veehouderij',
                        url: 'https://www.fao.org/4/i3437e/i3437e00.htm'
                    }
                ],
                [
                    {
                        name: 'FAO — schapen, methaan en landgebruik',
                        url: 'https://www.fao.org/4/i3437e/i3437e00.htm'
                    }
                ],
                [
                    {
                        name: 'IWTO — levenscyclusanalyse van wol',
                        url: 'https://iwto.org/sustainability/life-cycle-assessment/'
                    }
                ]
            ]
        };
        const material = materials[button.dataset.mat];
        $('#matActiveTitle').textContent = material.title;
        $('.cotton-section').dataset.material =
            button.dataset.mat;

        $$('.mat-tabs button').forEach((tab) => {
            tab.setAttribute(
                'aria-pressed',
                tab === button
            );
        });

        $('#matFacts').innerHTML = material.facts
        .map(([title, copy], index) => {
            const sources = materialFactSources[button.dataset.mat]?.[index] || [];
    
            return `
                <article>
                    <b>${title}</b>
                    <div>${copy}</div>
                    <span class="fact-source">
                        <button type="button" aria-label="Toon bronnen voor ${title}">
                            ⓘ
                        </button>
                        <span class="fact-source-popover">
                            ${sources.map((source) => `
                                <a href="${source.url}" target="_blank"
                                   rel="noopener noreferrer">${source.name}</a>
                            `).join('')}
                        </span>
                    </span>
                </article>
            `;
        })
        .join('');
    };
});


// ==============================
// Afval sectie
// ==============================

const wasteSection = $('.waste-section');
const wasteFact = $('#wasteFact');
const wasteItems = $$('.falling');

const wasteFacts = [
    `In de EU gooit iedereen jaarlijks gemiddeld <strong>16 kg textiel</strong> weg, waarvan <strong>85%</strong> gewoon bij het restafval belandt. Zelfs <strong>onverkochte kleding</strong> wordt op grote schaal vernietigd, terwijl wereldwijd pas <strong>1%</strong> wordt gerecycled tot nieuwe stof. Zo verandert een 'goedkoop' kledingstuk aan het einde van de rit in een enorme berg <strong>milieuvervuiling</strong>.
    <span class="water-source">
        <button class="water-source-trigger" type="button"
            aria-label="Toon bronnen over textielafval">
            ⓘ
        </button>
        <span class="water-source-popover">
            <strong>Bronnen</strong>
            <a href="https://www.eea.europa.eu/en/analysis/publications/management-of-used-and-waste-textiles-in-europes-circular-economy"
                target="_blank" rel="noopener noreferrer">
                EEA — textielafval in Europa
            </a>
            <a href="https://www.ellenmacarthurfoundation.org/a-new-textiles-economy"
                target="_blank" rel="noopener noreferrer">
                Ellen MacArthur Foundation — textielrecycling
            </a>
            <a href="https://environment.ec.europa.eu/strategy/textiles-strategy_en"
                target="_blank" rel="noopener noreferrer">
                Europese Commissie — vernietiging van onverkochte kleding
            </a>
        </span>
    </span>`
];

const wasteSteps = [
    0.12,
    0.30,
    0.48,
    0.66
];

let wasteTick = false;


function updateWaste() {
    const distance = Math.max(
        1,
        wasteSection.offsetHeight - innerHeight
    );

    const progress = Math.max(
        0,
        Math.min(
            1,
            -wasteSection.getBoundingClientRect().top / distance
        )
    );


    // Vallende kleding
    wasteItems.forEach((item, index) => {
        item.classList.toggle(
            'in',
            progress >= wasteSteps[index]
        );
    });


    // Afvaltekst
    const factIndex =
        progress < 0.12
            ? -1
            : Math.min(
                wasteFacts.length - 1,
                Math.floor((progress - 0.12) / 0.18)
            );

    const copy = wasteFacts[0];

    if (wasteFact.innerHTML !== copy) {
                wasteFact.classList.add('is-changing');

        setTimeout(() => {
            wasteFact.innerHTML = copy;
            wasteFact.classList.remove('is-changing');
        }, 140);
    }
}


addEventListener(
    'scroll',
    () => {
        if (!wasteTick) {
            wasteTick = true;

            requestAnimationFrame(() => {
                updateWaste();
                wasteTick = false;
            });
        }
    },
    { passive: true }
);


addEventListener('resize', updateWaste);

updateWaste();


// ==============================
// Bonnetje / receipt
// ==============================
const receiptTrigger = document.getElementById('receiptTrigger');
const receiptPanel = document.getElementById('receipt');
const receiptClose = document.getElementById('receiptClose');

if (receiptTrigger && receiptPanel) {
    receiptTrigger.addEventListener('click', () => {
        const openen = receiptPanel.hidden;

        receiptPanel.hidden = !openen;
        receiptTrigger.setAttribute('aria-expanded', String(openen));
    });

    receiptClose?.addEventListener('click', () => {
        receiptPanel.hidden = true;
        receiptTrigger.setAttribute('aria-expanded', 'false');
        receiptTrigger.focus();
    });
} else {
    receiptTrigger.addEventListener('click', () => {
        console.log('Bonnetje-knop aangeklikt');
    
        const openen = receiptPanel.hidden;
        receiptPanel.hidden = !openen;
        receiptTrigger.setAttribute('aria-expanded', String(openen));
    });}

    const storyIntro = document.getElementById("storyIntro");
    const startStoryButton = document.getElementById("startStory");
  
    startStoryButton.addEventListener("click", async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        // De story start ook als fullscreen niet beschikbaar is.
      }
  
      window.scrollTo(0, 0);
      storyIntro.remove();
    });