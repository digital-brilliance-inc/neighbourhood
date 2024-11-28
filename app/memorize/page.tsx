'use client';
import { Section } from '@/components/section/section';
import './styles.scss';
import { Footer } from '@/components/footer/footer';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(1);
  const { data: session } = useSession();
  const [passage, setPassage] = useState<any>({});
  const [verseItems, setVerseItems] = useState<any>({});
  const [wordItemValues, setWordItemValues] = useState<any>({});
  const [scoreCorrect, setScoreCorrect] = useState<number>();
  const [scoreTotal, setScoreTotal] = useState<number>();

  useEffect(() => {
    const newPassage = {
      title: 'Psalm 139',
      subtitle: 'For the director of music. Of David. A psalm.',
      content: [
        { type: 'verse', verseNumber: 1, text: 'You have searched me, Lord,\nand you know me.' },
        {
          type: 'verse',
          verseNumber: 2,
          text: 'You know when I sit and when I rise;\nyou perceive my thoughts from afar.',
        },
        {
          type: 'verse',
          verseNumber: 3,
          text: 'You discern my going out and my lying down;\nyou are familiar with all my ways.',
        },
        { type: 'verse', verseNumber: 4, text: 'Before a word is on my tongue\nyou, Lord, know it completely.' },
        { type: 'verse', verseNumber: 5, text: 'You hem me in behind and before,\nand you lay your hand upon me.' },
        {
          type: 'verse',
          verseNumber: 6,
          text: 'Such knowledge is too wonderful for me,\ntoo lofty for me to attain.',
        },
        { type: 'break' },
        {
          type: 'verse',
          verseNumber: 7,
          text: 'Where can I go from your Spirit?\nWhere can I flee from your presence?',
        },
        {
          type: 'verse',
          verseNumber: 8,
          text: 'If I go up to the heavens, you are there;\nif I make my bed in the depths, you are there.',
        },
        {
          type: 'verse',
          verseNumber: 9,
          text: 'If I rise on the wings of the dawn,\nif I settle on the far side of the sea,',
        },
        {
          type: 'verse',
          verseNumber: 10,
          text: 'even there your hand will guide me,\nyour right hand will hold me fast.',
        },
        {
          type: 'verse',
          verseNumber: 11,
          text: 'If I say, “Surely the darkness will hide me\nand the light become night around me,”',
        },
        {
          type: 'verse',
          verseNumber: 12,
          text: 'even the darkness will not be dark to you;\nthe night will shine like the day,\nfor darkness is as light to you.',
        },
        { type: 'break' },
        {
          type: 'verse',
          verseNumber: 13,
          text: 'For you created my inmost being;\nyou knit me together in my mother’s womb.',
        },
        {
          type: 'verse',
          verseNumber: 14,
          text: 'I praise you because I am fearfully and wonderfully made;\nyour works are wonderful,\nI know that full well.',
        },
        {
          type: 'verse',
          verseNumber: 15,
          text: 'My frame was not hidden from you\nwhen I was made in the secret place,\nwhen I was woven together in the depths of the earth.',
        },
        {
          type: 'verse',
          verseNumber: 16,
          text: 'Your eyes saw my unformed body;\nall the days ordained for me were written in your book\nbefore one of them came to be.',
        },
        {
          type: 'verse',
          verseNumber: 17,
          text: 'How precious to me are your thoughts,[a] God!\nHow vast is the sum of them!',
        },
        {
          type: 'verse',
          verseNumber: 18,
          text: 'Were I to count them,\nthey would outnumber the grains of sand—\nwhen I awake, I am still with you.',
        },
        { type: 'break' },
        {
          type: 'verse',
          verseNumber: 19,
          text: 'If only you, God, would slay the wicked!\nAway from me, you who are bloodthirsty!',
        },
        {
          type: 'verse',
          verseNumber: 20,
          text: 'They speak of you with evil intent;\nyour adversaries misuse your name.',
        },
        {
          type: 'verse',
          verseNumber: 21,
          text: 'Do I not hate those who hate you, Lord,\nand abhor those who are in rebellion against you?',
        },
        { type: 'verse', verseNumber: 22, text: 'I have nothing but hatred for them;\nI count them my enemies.' },
        {
          type: 'verse',
          verseNumber: 23,
          text: 'Search me, God, and know my heart;\ntest me and know my anxious thoughts.',
        },
        {
          type: 'verse',
          verseNumber: 24,
          text: 'See if there is any offensive way in me,\nand lead me in the way everlasting.',
        },
      ],
    };

    setPassage(newPassage);

    let newVerseItems: any = {};
    for (let cItem of newPassage.content) {
      if (cItem.type === 'verse') {
        newVerseItems[cItem.verseNumber || 0] = createVerseItem(cItem.text || '');
      }
    }

    setVerseItems(newVerseItems);
    setScoreCorrect(undefined);
    setScoreTotal(undefined);
  }, [difficulty]);

  const createVerseItem = (verseText: string) => {
    const regex = /([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)/g;
    let match;
    const verseItem: any = { wordItems: [] };

    while ((match = regex.exec(verseText)) !== null) {
      const beforePunctuation = match[1];
      const word = match[2];
      const afterPunctuation = match[3];

      const id = uuid();
      verseItem.wordItems.push({
        id,
        word,
        beforePunctuation,
        afterPunctuation,
        lineBreak: afterPunctuation.endsWith('\n'),
        value: '',
        isValid: null,
        isEditable: Math.random() < difficulty / 4,
      });
    }
    return verseItem;
  };

  const setWordItemValue = (id: string, value: string) => {
    setWordItemValues({ ...wordItemValues, [id]: value });
  };

  const submitAnswers = () => {
    console.log('Answers submitted');
    let newScoreTotal = 0;
    let newScoreCorrect = 0;
    for (let verseItemKey of Object.keys(verseItems)) {
      const verseItem = verseItems[verseItemKey];
      for (let wordItem of verseItem.wordItems) {
        wordItem.isInvalid =
          wordItem.word.toLowerCase().trim() !== (wordItemValues[wordItem.id] || '').toLowerCase().trim();
        newScoreCorrect += !wordItem.isInvalid ? 1 : 0;
        newScoreTotal++;
      }
    }
    setVerseItems({ ...verseItems });
    setScoreCorrect(newScoreCorrect);
    setScoreTotal(newScoreTotal);
  };

  const difficultyChanged = (event: any) => {
    const newValue = Number(event.target.value);
    setDifficulty(newValue);
  };

  return (
    <div className="page-memorize">
      <div className="flex-container">
        <Section title="Memorizing Scripture">
          <div>
            <p>
              Memorizing scripture is a great way to embed truth deeply in our minds and hearts. When we memorize
              scripture, it enables the Holy Spirit to bring it to mind in situations in our lives when we need it most.
            </p>
            <div style={{ maxWidth: 300 }}>
              <Form.Label>Level of difficulty</Form.Label>
              <Form.Range min={0} max={4} step={1} defaultValue={difficulty} onChange={difficultyChanged} />
            </div>
          </div>
        </Section>
        <Section title={passage.title} shaded={true}>
          <div className="">
            <div className="passage-container">
              {passage.subtitle && <p>{passage.subtitle}</p>}
              {(passage.content || []).map((cItem: any, index: number) => {
                if (cItem.type === 'break') {
                  return <p key={index} className="break" style={{ marginBottom: 24 }}></p>;
                } else if (cItem.type === 'verse') {
                  return (
                    <p key={index} className="verse">
                      <span className="verse-number">{cItem.verseNumber}</span>{' '}
                      {verseItems[cItem.verseNumber].wordItems.map((wi: any) => {
                        if (wi.isEditable) {
                          return (
                            <span>
                              <span>{wi.beforePunctuation}</span>
                              <input
                                style={{ width: 20 + wi.word.length * 12, marginBottom: '8px' }}
                                className={
                                  'word-input ' +
                                  (wi.isInvalid === true ? 'invalid' : wi.isInvalid === false ? 'valid' : '')
                                }
                                type="text"
                                defaultValue={''}
                                onChange={(event: any) => setWordItemValue(wi.id, event.target.value)}
                              ></input>
                              <span>
                                {wi.afterPunctuation}
                                {wi.lineBreak ? <br /> : null}
                              </span>
                            </span>
                          );
                        } else {
                          return (
                            <span style={{ lineHeight: '48px' }}>
                              {wi.beforePunctuation || ''}
                              {wi.word}
                              {wi.afterPunctuation || ''}
                              {wi.lineBreak ? <br /> : ' '}
                            </span>
                          );
                        }
                      })}
                    </p>
                  );
                }
              })}
            </div>
            <div className="submission-container">
              {scoreTotal !== undefined && (
                <div className="score">
                  Score: <span className="correct">{scoreCorrect}</span> / <span className="total">{scoreTotal}</span>
                </div>
              )}
              <div></div>
              <Button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => submitAnswers()}>
                Check your answers
              </Button>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
}
