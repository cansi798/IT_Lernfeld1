window.QUIZ_DATA = {
  titel: "Tag 3 · Session 1 — Geschäftsprozesse, Produktionsfaktoren, Güterarten",
  fragen: [

    // === 10 Fragen: Prozessarten & Wertschöpfung ===

    {
      frage: "Wie berechnet sich die Wertschöpfung eines Unternehmens korrekt?",
      optionen: [
        "Umsatzerlöse minus Personalkosten",
        "Gesamtkosten minus Fixkosten",
        "Gewinn plus Steuern plus Löhne",
        "Umsatzerlöse minus Vorleistungen minus Abschreibungen"
      ],
      richtig: 3,
      erklaerung: "Die Wertschöpfung ergibt sich aus den Umsatzerlösen abzüglich der Vorleistungen (eingekaufte Güter und Dienste) und der Abschreibungen. Personalkosten sind kein Abzugsposten, sondern Teil der Wertschöpfungsverteilung."
    },

    {
      frage: "Welche Aussage über Kernprozesse ist fachlich korrekt?",
      optionen: [
        "Kernprozesse stiften unmittelbar Kundennutzen und sind besonders wertschöpfungsintensiv.",
        "Kernprozesse sind immer kostenintensiver als Supportprozesse.",
        "Kernprozesse umfassen ausschließlich administrative Tätigkeiten.",
        "Kernprozesse werden von der Geschäftsleitung durchgeführt und heißen daher Führungsprozesse."
      ],
      richtig: 0,
      erklaerung: "Kernprozesse stiften unmittelbar Kundennutzen und sind besonders wertschöpfungsintensiv. Das Unternehmen weist dafür besondere Kernkompetenzen nach. Sie sind das Herzstück der betrieblichen Leistungserbringung."
    },

    {
      frage: "Was versteht man unter Vorleistungen bei der Wertschöpfungsberechnung?",
      optionen: [
        "Löhne und Gehälter der Mitarbeiter",
        "Zinsen für Bankdarlehen",
        "Eingekaufte Güter und Dienstleistungen für den betrieblichen Zweck, ohne Löhne, Zinsen und Steuern",
        "Jahresüberschuss nach Steuern"
      ],
      richtig: 2,
      erklaerung: "Vorleistungen sind alle eingekauften Produkte oder Dienstleistungen für den unternehmerischen Zweck — ohne Löhne, Zinsen und Steuern. Diese gehören zur Wertschöpfungsverteilung, nicht zur Berechnung."
    },

    {
      frage: "Supportprozesse werden auch als Unterstützungsprozesse bezeichnet. Welches Merkmal kennzeichnet sie am besten?",
      optionen: [
        "Sie erzeugen unmittelbaren Kundennutzen und hohe Erlöse.",
        "Sie steuern strategisch das gesamte Unternehmen.",
        "Sie sind nicht direkt wertschöpfend, aber notwendig, um Kernprozesse zu ermöglichen.",
        "Sie werden ausschließlich von Auszubildenden durchgeführt."
      ],
      richtig: 2,
      erklaerung: "Supportprozesse erzeugen keine direkte Wertschöpfung, sind aber intern notwendig, damit die Kernprozesse reibungslos ablaufen können. Beispiele sind Buchhaltung, Lohnabrechnung und interne IT-Betreuung."
    },

    {
      frage: "Was ist die Wertschöpfungstiefe eines Unternehmens?",
      optionen: [
        "Die Wertschöpfung pro Mitarbeiter",
        "Die Wertschöpfung dividiert durch die Gesamtleistung (Umsatz)",
        "Der Anteil der Steuern an der Wertschöpfung",
        "Die Summe aller Abschreibungen im Geschäftsjahr"
      ],
      richtig: 1,
      erklaerung: "Die Wertschöpfungstiefe = Wertschöpfung geteilt durch Gesamtleistung (Output). Sie zeigt, wie viel des Gesamtumsatzes das Unternehmen selbst erwirtschaftet — im Gegensatz zu zugekauften Vorleistungen."
    },

    {
      frage: "Welche Personengruppe profitiert NICHT direkt von der Wertschöpfung eines Unternehmens?",
      optionen: [
        "Mitarbeiter (Löhne und Gehälter)",
        "Fremdkapitalgeber (Zinsen für Darlehen)",
        "Staat (Steuern und Abgaben)",
        "Konkurrenten des Unternehmens"
      ],
      richtig: 3,
      erklaerung: "Die Wertschöpfungsnutznießer sind Mitarbeiter, Fremdkapitalgeber, der Staat und Eigenkapitalgeber. Konkurrenten sind keine Stakeholder, die an der Wertschöpfungsverteilung beteiligt werden."
    },

    {
      frage: "Was sind Workflows im Kontext von Geschäftsprozessen?",
      optionen: [
        "Strategische Planungsdokumente der Geschäftsleitung",
        "Teilprozesse auf der untersten Detaillierungsebene, die rechnergestützt und automatisiert ablaufen",
        "Externe Lieferprozesse von Zulieferern",
        "Beschwerdemanagement-Prozesse im Kundendienst"
      ],
      richtig: 1,
      erklaerung: "Workflows sind Arbeitsabläufe bzw. Teilprozesse auf der untersten Detaillierungsebene, die rechnergestützt und damit weitgehend automatisiert ablaufen und durch ein Workflowmanagementsystem gesteuert werden."
    },

    {
      frage: "Ein Unternehmen erzielt 5 Mio. Euro Umsatz, hat Vorleistungen von 2 Mio. Euro und Abschreibungen von 0,5 Mio. Euro. Wie hoch ist die Wertschöpfung?",
      optionen: [
        "5,0 Mio. Euro",
        "3,0 Mio. Euro",
        "2,5 Mio. Euro",
        "7,5 Mio. Euro"
      ],
      richtig: 2,
      erklaerung: "Wertschöpfung = 5 Mio. minus 2 Mio. minus 0,5 Mio. = 2,5 Mio. Euro. Die Vorleistungen und Abschreibungen werden vom Umsatz abgezogen, um die tatsächlich im Unternehmen erzeugte Wertschöpfung zu ermitteln."
    },

    {
      frage: "Welche der folgenden Tätigkeiten zählt laut Lehrbuch ausdrücklich NICHT zur Wertschöpfungskette?",
      optionen: [
        "Interne Personalverwaltung und Buchhaltung",
        "Beratung von Kunden bei IT-Lösungen",
        "Installation von Netzwerkinfrastruktur beim Kunden",
        "After-Sales-Service und technischer Kundendienst"
      ],
      richtig: 0,
      erklaerung: "Laut Lehrbuch zählen verwaltende Tätigkeiten wie Personalwesen, Rechnungswesen und interne IT ausdrücklich nicht zur Wertschöpfungskette — sie sind Supportprozesse, die Kernprozesse intern unterstützen."
    },

    {
      frage: "Führungsprozesse haben welche Hauptaufgabe im Unternehmen?",
      optionen: [
        "Sie erbringen operative IT-Leistungen für externe Kunden.",
        "Sie koordinieren, steuern und kontrollieren das gesamte Unternehmen strategisch und operativ.",
        "Sie wickeln die Lohnabrechnung und Buchhaltung ab.",
        "Sie beschaffen Hardware und Software für den Weiterverkauf."
      ],
      richtig: 1,
      erklaerung: "Führungsprozesse koordinieren und steuern das Unternehmen auf Zielebene: strategische Planung, Controlling, Qualitätsmanagement und Risikomanagement. Sie sind nicht direkt wertschöpfend, aber für die Unternehmenssteuerung unerlässlich."
    },

    // === 6 Fragen: Prozessbeispiele IT-Systemhaus ===

    {
      frage: "Ein Kunde beauftragt JIKU mit der Einrichtung eines Netzwerks. Zu welcher Prozessart gehört die Leistungserbringung beim Kunden?",
      optionen: [
        "Führungsprozess",
        "Kernprozess",
        "Supportprozess",
        "Verwaltungsprozess"
      ],
      richtig: 1,
      erklaerung: "Die Installation eines Netzwerks beim Kunden ist ein Kernprozess: Er stiftet unmittelbar Kundennutzen und ist wertschöpfungsintensiv — genau die Merkmale eines Wertschöpfungsprozesses."
    },

    {
      frage: "Die JIKU-Buchhaltungsabteilung erstellt monatlich Lohnabrechnungen für alle Mitarbeiter. Welchem Prozesstyp entspricht das?",
      optionen: [
        "Kernprozess, da Löhne direkt die Mitarbeiterleistung finanzieren",
        "Führungsprozess, da die Geschäftsleitung informiert wird",
        "Supportprozess, da es sich um interne Verwaltung ohne direkten Kundennutzen handelt",
        "Workflow-Prozess, da es automatisiert läuft"
      ],
      richtig: 2,
      erklaerung: "Die Lohnabrechnung ist ein Supportprozess: Sie erzeugt keinen direkten Kundennutzen und keine externe Wertschöpfung, ist aber notwendig, damit das Unternehmen funktioniert."
    },

    {
      frage: "Das JIKU-Management definiert die Geschäftsstrategie für die nächsten fünf Jahre und legt Umsatzziele fest. Welchem Prozesstyp entspricht das?",
      optionen: [
        "Kernprozess",
        "Supportprozess",
        "Vertriebsprozess",
        "Führungsprozess"
      ],
      richtig: 3,
      erklaerung: "Die strategische Jahres- und Langzeitplanung durch das Management ist ein typischer Führungsprozess: Er koordiniert das Unternehmen auf Zielebene und steuert alle anderen Prozesse."
    },

    {
      frage: "JIKU betreut als IT-Systemhaus den Help-Desk eines Firmenkunden remote. Zu welcher Prozessart zählt diese Tätigkeit?",
      optionen: [
        "Supportprozess, da technischer Support intern ist",
        "Kernprozess, da der Kundennutzen direkt entsteht und Wertschöpfung generiert wird",
        "Führungsprozess, da ein Manager den Help-Desk leitet",
        "Verwaltungsprozess, da Tickets verwaltet werden"
      ],
      richtig: 1,
      erklaerung: "Der externe IT-Help-Desk für Firmenkunden ist ein Kernprozess: JIKU erbringt damit eine direkte, vergütete Dienstleistung gegenüber dem Kunden — kundennah und wertschöpfungsintensiv."
    },

    {
      frage: "Die interne IT-Abteilung von JIKU pflegt die eigenen Server und das interne Firmennetzwerk. Welchem Prozesstyp entspricht das?",
      optionen: [
        "Kernprozess, da IT-Kompetenz eingesetzt wird",
        "Führungsprozess, da es die Handlungsfähigkeit sichert",
        "Supportprozess, da es eine interne Infrastrukturleistung ohne direkten Kundennutzen ist",
        "Kernprozess, da Server zum Leistungsportfolio gehören"
      ],
      richtig: 2,
      erklaerung: "Die interne IT-Betreuung der eigenen Systeme ist ein Supportprozess: Sie erbringt keine Leistung für externe Kunden, sondern unterstützt intern die Durchführung der Kernprozesse."
    },

    {
      frage: "JIKU migriert die Cloud-Infrastruktur eines Mittelstandskunden zu einem deutschen Cloud-Anbieter. Welchem Prozesstyp entspricht das?",
      optionen: [
        "Supportprozess",
        "Führungsprozess",
        "Verwaltungsprozess",
        "Kernprozess"
      ],
      richtig: 3,
      erklaerung: "Die Cloud-Migration für einen externen Kunden ist ein Kernprozess: Sie ist kundennah, wertschöpfungsintensiv und gehört zu den Kernkompetenzen eines IT-Systemhauses wie JIKU."
    },

    // === 8 Fragen: Volkswirtschaftliche Produktionsfaktoren ===

    {
      frage: "Welche drei klassischen volkswirtschaftlichen Produktionsfaktoren werden unterschieden?",
      optionen: [
        "Arbeit, Boden und Kapital",
        "Rohstoffe, Maschinen, Energie",
        "Elementarfaktoren, dispositiver Faktor, Wissen",
        "Input, Throughput, Output"
      ],
      richtig: 0,
      erklaerung: "Die drei klassischen volkswirtschaftlichen Produktionsfaktoren sind Arbeit (menschliche Leistung), Boden (natürliche Ressourcen und Grundstücke) und Kapital (produzierte Produktionsmittel). Sie werden von Haushalten bereitgestellt."
    },

    {
      frage: "Was umfasst der volkswirtschaftliche Produktionsfaktor 'Boden'?",
      optionen: [
        "Ausschließlich landwirtschaftliche Nutzflächen",
        "Den Lagerhallenboden eines Unternehmens",
        "Das Eigenkapital der Eigentümer",
        "Alle natürlichen Ressourcen und Grundstücke, die für die Produktion genutzt werden"
      ],
      richtig: 3,
      erklaerung: "Der Produktionsfaktor Boden umfasst alle natürlichen Ressourcen wie Grundstücke, Rohstoffvorkommen und Naturräume — nicht nur landwirtschaftliche Flächen. Für ein Rechenzentrum wäre das z. B. das Grundstück."
    },

    {
      frage: "Warum wird Wissen/Information heute als vierter volkswirtschaftlicher Produktionsfaktor angesehen?",
      optionen: [
        "Weil Wissen kostenlos und unbegrenzt verfügbar ist",
        "Weil die Informationswirtschaft bedeutend gewachsen ist und Wissen sowie Daten zur zentralen Produktionsgrundlage wurden",
        "Weil staatliche Behörden dies per Gesetz festgelegt haben",
        "Weil Arbeit durch Wissen vollständig ersetzt wird"
      ],
      richtig: 1,
      erklaerung: "Mit dem Aufstieg der Informationswirtschaft wurde Wissen (auch: Information, Rechte) als eigenständiger Produktionsfaktor anerkannt. In der IT-Branche sind Know-how, Softwarelizenzen und Daten zentrale Produktionsgrundlagen."
    },

    {
      frage: "Was erhalten Haushalte als Entgelt, wenn sie den volkswirtschaftlichen Produktionsfaktor Kapital bereitstellen?",
      optionen: [
        "Löhne",
        "Pacht oder Miete",
        "Zinsen",
        "Subventionen"
      ],
      richtig: 2,
      erklaerung: "Wenn Haushalte Kapital (z. B. Geld) bereitstellen, erhalten sie dafür Zinsen als Entgelt. Für Arbeit gibt es Löhne, für Boden Pacht oder Miete."
    },

    {
      frage: "Welcher volkswirtschaftliche Produktionsfaktor ist bei einem IT-Systemhaus wie JIKU besonders bedeutsam?",
      optionen: [
        "Boden, da Rechenzentren große Grundstücke benötigen",
        "Wissen/Information, da Fachkompetenz, Softwarerechte und Daten die Kernleistung ausmachen",
        "Kapital, da Server teuer in der Anschaffung sind",
        "Arbeit, da alle Tätigkeiten manuell ausgeführt werden"
      ],
      richtig: 1,
      erklaerung: "Für ein IT-Systemhaus ist Wissen der entscheidende Produktionsfaktor: IT-Fachkompetenz der Mitarbeiter, Softwarezertifizierungen, Lizenzrechte und Kundendaten sind die wesentlichen Grundlagen für die Leistungserstellung."
    },

    {
      frage: "Welche Aussage zum volkswirtschaftlichen Kreislauf und Produktionsfaktoren ist richtig?",
      optionen: [
        "Unternehmen stellen Produktionsfaktoren bereit, Haushalte kaufen sie ein.",
        "Haushalte stellen Produktionsfaktoren bereit und erhalten dafür Entgelt von Unternehmen.",
        "Der Staat ist der alleinige Anbieter von Produktionsfaktoren.",
        "Produktionsfaktoren werden ausschließlich aus dem Ausland importiert."
      ],
      richtig: 1,
      erklaerung: "Im volkswirtschaftlichen Kreislauf stellen Haushalte ihre Produktionsfaktoren (Arbeit, Boden, Kapital) den Unternehmen auf dem Faktormarkt zur Verfügung und erhalten dafür Entgelt (Löhne, Pacht, Zinsen)."
    },

    {
      frage: "Was ist der Unterschied zwischen volkswirtschaftlichen und betriebswirtschaftlichen Produktionsfaktoren?",
      optionen: [
        "Es gibt keinen Unterschied, beide Begriffe sind identisch.",
        "Volkswirtschaftliche Faktoren beschreiben gesamtwirtschaftliche Ressourcen; betriebswirtschaftliche Faktoren nach Gutenberg betreffen den einzelnen Betrieb.",
        "Betriebswirtschaftliche Faktoren werden nur im öffentlichen Sektor verwendet.",
        "Volkswirtschaftliche Faktoren umfassen ausschließlich Rohstoffe."
      ],
      richtig: 1,
      erklaerung: "Volkswirtschaftliche Faktoren (Arbeit, Boden, Kapital) beschreiben gesamtwirtschaftliche Ressourcen auf Makroebene. Gutenbergs betriebswirtschaftliche Faktoren (Elementarfaktoren + dispositiver Faktor) beschreiben, was ein einzelner Betrieb zur Leistungserstellung einsetzt."
    },

    {
      frage: "Ein Landwirt verpachtet seinen Acker an ein Logistikunternehmen für den Bau einer Lagerhalle. Welchen volkswirtschaftlichen Produktionsfaktor stellt er bereit?",
      optionen: [
        "Kapital",
        "Arbeit",
        "Boden",
        "Wissen"
      ],
      richtig: 2,
      erklaerung: "Der Acker ist ein natürlicher Ressourcenfaktor und gehört zum Produktionsfaktor Boden. Der Landwirt stellt als Haushalt den Faktor Boden bereit und erhält dafür Pacht als Entgelt."
    },

    // === 8 Fragen: Betriebswirtschaftliche Produktionsfaktoren ===

    {
      frage: "Wer hat das Konzept der betriebswirtschaftlichen Produktionsfaktoren mit Elementar- und dispositivem Faktor entwickelt?",
      optionen: [
        "Max Weber",
        "Adam Smith",
        "Erich Gutenberg",
        "Friedrich Hayek"
      ],
      richtig: 2,
      erklaerung: "Der Wirtschaftswissenschaftler Erich Gutenberg (1897–1984) unterschied als betriebswirtschaftliche Produktionsfaktoren Werkstoffe, Betriebsmittel und ausführende Arbeit als Elementarfaktoren sowie die Geschäftsleitung als dispositiven Faktor."
    },

    {
      frage: "Was sind die drei Elementarfaktoren nach Gutenberg?",
      optionen: [
        "Leitung, Planung, Organisation und Kontrolle",
        "Ausführende Arbeit, Betriebsmittel und Werkstoffe",
        "Arbeit, Boden und Kapital",
        "Rohstoffe, Energie und Informationen"
      ],
      richtig: 1,
      erklaerung: "Die drei Elementarfaktoren nach Gutenberg sind: ausführende Arbeit (operative, nicht leitende Tätigkeit), Betriebsmittel (technische Ausstattung wie Maschinen und Gebäude) und Werkstoffe (Roh-, Hilfs- und Betriebsstoffe sowie Fertigteile)."
    },

    {
      frage: "Was ist der dispositive Faktor nach Gutenberg?",
      optionen: [
        "Die ausführende Arbeit der Techniker",
        "Die Maschinen und technischen Geräte des Unternehmens",
        "Die Rohstoffe und Hilfsstoffe",
        "Die Geschäftsleitung mit Leitung, Planung, Organisation und Kontrolle"
      ],
      richtig: 3,
      erklaerung: "Der dispositive Faktor ist die Geschäftsleitung. Sie ergänzt die Elementarfaktoren zu einer produktiven Einheit durch Leitung, Planung, Organisation und Kontrolle. Ohne diesen Faktor können die Elementarfaktoren nicht zielgerichtet eingesetzt werden."
    },

    {
      frage: "Ein IT-Techniker bei JIKU installiert Router und Switches im Serverraum des Kunden. Welchem betriebswirtschaftlichen Produktionsfaktor entspricht seine Tätigkeit?",
      optionen: [
        "Dispositiver Faktor",
        "Betriebsmittel",
        "Ausführende Arbeit (Elementarfaktor)",
        "Werkstoffe"
      ],
      richtig: 2,
      erklaerung: "Der Techniker führt eine operative Tätigkeit aus, ohne leitende, planende oder kontrollierende Funktion. Das entspricht dem Elementarfaktor 'ausführende Arbeit' nach Gutenberg."
    },

    {
      frage: "Netzwerkkabel, Festplatten und Kühlmittel für die Serveranlage bei JIKU sind welchem betriebswirtschaftlichen Produktionsfaktor zuzuordnen?",
      optionen: [
        "Dispositiver Faktor",
        "Betriebsmittel",
        "Ausführende Arbeit",
        "Werkstoffe (Elementarfaktor)"
      ],
      richtig: 3,
      erklaerung: "Netzwerkkabel, Festplatten (als Einbauteile) und Kühlmittel (Betriebsstoff) gehören zu den Werkstoffen, dem dritten Elementarfaktor nach Gutenberg. Werkstoffe sind alle Güter, die zur Erstellung eines Produktes oder einer Leistung notwendig sind."
    },

    {
      frage: "Warum hat Gutenberg den Faktor Information/Wissen nicht in sein ursprüngliches Modell aufgenommen?",
      optionen: [
        "Weil sein Modell auf Produktionsbetriebe ausgerichtet war und die Informationswirtschaft damals keine bedeutende Rolle spielte",
        "Weil er Wissen für unerheblich hielt",
        "Weil Information kein knappes Gut ist",
        "Weil Information bereits im Faktor Kapital enthalten ist"
      ],
      richtig: 0,
      erklaerung: "Gutenberg entwickelte sein Modell hauptsächlich für Industriebetriebe in den 1950er Jahren. Die Informationswirtschaft war nicht Gegenstand seiner Betrachtung. Erst in späteren Jahrzehnten wurde Information als eigenständiger Faktor ergänzt."
    },

    {
      frage: "Der Standortleiter von JIKU entscheidet, welche Mitarbeiter für ein Großprojekt eingeplant werden, und organisiert die Ressourcenverteilung. Welchem Produktionsfaktor entspricht das?",
      optionen: [
        "Elementarfaktor: ausführende Arbeit",
        "Elementarfaktor: Betriebsmittel",
        "Dispositiver Faktor (Leitung/Planung/Organisation)",
        "Elementarfaktor: Werkstoffe"
      ],
      richtig: 2,
      erklaerung: "Entscheidungen über Ressourcenplanung und Personalzuweisung gehören zu den Aufgaben des dispositiven Faktors: Leitung, Planung, Organisation und Kontrolle. Das ist die Funktion der Geschäfts- oder Projektleitung."
    },

    {
      frage: "Die Serverracks und Netzwerkgeräte, die JIKU im eigenen Rechenzentrum betreibt, zählen zu welchem Elementarfaktor?",
      optionen: [
        "Werkstoffe",
        "Betriebsmittel",
        "Ausführende Arbeit",
        "Dispositiver Faktor"
      ],
      richtig: 1,
      erklaerung: "Server, Netzwerkgeräte und Racks sind technische Ausstattungen und gehören zu den Betriebsmitteln — dem zweiten Elementarfaktor nach Gutenberg. Betriebsmittel sind alle technischen Mittel, die im Produktionsprozess eingesetzt werden."
    },

    // === 8 Fragen: Güterarten und Organisationsmittel ===

    {
      frage: "Was sind freie Güter?",
      optionen: [
        "Güter, die der Staat kostenlos zur Verfügung stellt",
        "Güter, die unbegrenzt verfügbar sind und für die kein Preis gezahlt werden muss, wie Atemluft oder Sonnenschein",
        "Güter, die im Sonderangebot erhältlich sind",
        "Güter, die ausschließlich öffentlichen Einrichtungen vorbehalten sind"
      ],
      richtig: 1,
      erklaerung: "Freie Güter sind in der Natur in unbegrenzter Menge vorhanden, z. B. Atemluft oder Sonnenschein. Im Gegensatz dazu sind wirtschaftliche Güter knapp und haben einen Preis."
    },

    {
      frage: "Eine Softwarelizenz für ein Betriebssystem — wie ist dieses Gut zu klassifizieren?",
      optionen: [
        "Freies Gut, materielles Gebrauchsgut, öffentliches Gut",
        "Wirtschaftliches Gut, immaterielles Recht, Investitions- und Gebrauchsgut, privates Gut",
        "Freies Gut, immaterielles Verbrauchsgut, öffentliches Gut",
        "Wirtschaftliches Gut, materielles Gut, Konsumgut"
      ],
      richtig: 1,
      erklaerung: "Eine Softwarelizenz ist wirtschaftlich (sie hat einen Preis), immateriell (es ist ein Nutzungsrecht, kein physisches Produkt), ein Investitionsgut (zur betrieblichen Leistungserstellung), ein Gebrauchsgut (wiederholt nutzbar) und ein privates Gut (ausschließbar durch Lizenzschutz)."
    },

    {
      frage: "Druckerpapier im Büro ist ein Beispiel für welche Güterart?",
      optionen: [
        "Freies Gut",
        "Gebrauchsgut",
        "Öffentliches Gut",
        "Verbrauchsgut"
      ],
      richtig: 3,
      erklaerung: "Druckerpapier ist ein Verbrauchsgut: Es wird bei der Nutzung einmalig verbraucht. Im Gegensatz dazu kann ein Gebrauchsgut wie ein Drucker wiederholt über längere Zeit genutzt werden."
    },

    {
      frage: "Drucker und Toner sind ein Beispiel für welche Güterbeziehung?",
      optionen: [
        "Substitutive Güter",
        "Komplementäre Güter",
        "Unverbundene Güter",
        "Freie Güter"
      ],
      richtig: 1,
      erklaerung: "Drucker und Toner sind komplementäre Güter: Sie ergänzen sich gegenseitig — der Drucker ist ohne Toner nicht nutzbar. Bei komplementären Gütern beeinflusst die Nachfrage nach einem Gut die Nachfrage nach dem anderen direkt."
    },

    {
      frage: "Ein physischer Rack-Server, den JIKU im eigenen Rechenzentrum betreibt, ist welcher Güterart zuzuordnen?",
      optionen: [
        "Wirtschaftliches Gut, materiell, Investitionsgut (Betriebsmittel), Gebrauchsgut, privates Gut",
        "Freies Gut, immateriell, Konsumgut, Verbrauchsgut",
        "Wirtschaftliches Gut, materiell, Konsumgut, Verbrauchsgut",
        "Freies Gut, materiell, Investitionsgut, Gebrauchsgut"
      ],
      richtig: 0,
      erklaerung: "Ein Server ist wirtschaftlich (hat einen Preis), materiell (physische Hardware), ein Investitionsgut bzw. Betriebsmittel (dient der betrieblichen Leistungserbringung), ein Gebrauchsgut (mehrjährige Nutzungsdauer) und ein privates Gut (nur berechtigte Nutzer haben Zugang)."
    },

    {
      frage: "Was sind Organisationsmittel in einem Unternehmen?",
      optionen: [
        "Ausschließlich digitale Software-Tools für das Management",
        "Alle Arbeitsmittel und formalen Gestaltungsmittel in der Aufbau- und Ablauforganisation",
        "Nur die Maschinen und technischen Geräte der Produktion",
        "Nur externe Beratungsleistungen zur Unternehmensreorganisation"
      ],
      richtig: 1,
      erklaerung: "Organisationsmittel umfassen sowohl klassische Arbeitsmittel (Formulare, Organigramme, Checklisten) als auch formale Gestaltungsmittel in der Aufbau- und Ablauforganisation — heute zunehmend in digitaler Form (ERP, DMS, Ticketsysteme)."
    },

    {
      frage: "Ein Cloud-Dienst (SaaS) wie eine Buchhaltungssoftware, den JIKU monatlich abonniert, ist welchem Gütertyp zuzuordnen?",
      optionen: [
        "Freies Gut, da Cloud-Dienste im Internet verfügbar sind",
        "Materielles Gebrauchsgut, da Server physisch vorhanden sind",
        "Wirtschaftliches immaterielles Gut, Verbrauchsgut je Abrechnungsperiode, Investitionsgut",
        "Öffentliches Gut, da alle Unternehmen darauf zugreifen können"
      ],
      richtig: 2,
      erklaerung: "Ein SaaS-Abonnement ist wirtschaftlich (kostenpflichtig), immateriell (kein physisches Produkt), ein Verbrauchsgut (pro Abrechnungsperiode konsumiert), ein Investitionsgut (zur betrieblichen Nutzung) und ein privates Gut (nur abonnierte Nutzer haben Zugriff)."
    },

    {
      frage: "IT-Beratungsleistungen wie die Infrastrukturplanung für einen JIKU-Kunden — wie sind sie gütertypisch einzuordnen?",
      optionen: [
        "Materiell, Gebrauchsgut, frei",
        "Materiell, Verbrauchsgut, öffentliches Gut",
        "Frei, immateriell, Konsumgut",
        "Immateriell, Dienstleistung, wirtschaftliches Gut, privates Gut"
      ],
      richtig: 3,
      erklaerung: "IT-Beratung ist immateriell (kein physisches Produkt), eine Dienstleistung (wird erbracht, nicht hergestellt), ein wirtschaftliches Gut (kostenpflichtig) und ein privates Gut (nur der zahlende Auftraggeber erhält die Leistung)."
    }

  ]
};
