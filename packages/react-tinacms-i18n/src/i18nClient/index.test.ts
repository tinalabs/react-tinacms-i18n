import { I18nClient, Locale } from './i18nClient';

describe('i18nClient', () => {
  const TEST_LOCALE = {
    language: "en"
  }
  const i18n = new I18nClient({
    locale: {
      language: "en"
    },
    locales: [TEST_LOCALE]
  });

  describe('setLocale', () => {
    it('updates the locale to be newLocale', () => {
      const newLocal: Locale = {
        language: { code: 'en', label: 'English' },
        encoding: 'utf-8',
      };

      i18n.setLocale(newLocal);
      expect(i18n.getLocale()).toBe(newLocal);
    });
  });

  describe('getLocaleString()', () => {
    describe('the return types matches language[_region][.encoding][@modifier]when retrieved', () => {
      it('adds a . in front of the encoding', () => {
        i18n.setLocale({
          language: { code: 'en', label: 'English' },
          encoding: 'utf-8',
        });

        expect(i18n.getLocaleString()).toBe('en.utf-8');

        i18n.setLocale({
          language: { code: 'fr', label: 'French' },
          encoding: 'utf-16',
        });

        expect(i18n.getLocaleString()).toBe('fr.utf-16');
      });

      it('adds a _ in front of the region', () => {
        i18n.setLocale({
          language: { code: 'sp', label: 'Spanish' },
          region: { code: 'CA', label: 'Canada' },
        });

        expect(i18n.getLocaleString()).toBe('sp_CA');

        i18n.setLocale({
          language: { code: 'en', label: 'English' },
          region: { code: 'US', label: 'United States' },
        });
      
        expect(i18n.getLocaleString()).toBe('en_US');
      });

      it('adds a @ in front of the modifiers', () => {
        i18n.setLocale({
          language: { code: 'sp', label: 'Spanish' },
          modifiers: ['asdf', 'asdf2'],
        });
        
        expect(i18n.getLocaleString()).toBe('sp@asdf@asdf2');
        
        i18n.setLocale({
          language: { code: 'en', label: 'English' },
          modifiers: ['example', 'example2'],
        });
        
        expect(i18n.getLocaleString()).toBe('en@example@example2');
        
        i18n.setLocale({
          language: { code: 'en', label: 'English' },
          modifiers: ['1', '23', '4', '5', '6', '7', '8', '9', '10'],
        });
        
        expect(i18n.getLocaleString()).toBe('en@1@23@4@5@6@7@8@9@10');
      });

      it('returns the items in the order <lang>[region][encoding][...modifiers]', () => {
        const rand = Math.floor(Math.random() * 100);
        i18n.setLocale({});
        const vals: { locale: Locale; expected: string }[] = [
          {
            locale: {
              language: { code: 'en', label: 'English' },
              encoding: 'utf-8',
            },
            expected: 'en.utf-8',
          },
          {
            locale: {
              language: { code: 'en', label: 'English' },
              encoding: `utf-${rand}`,
            },
            expected: `en.utf-${rand}`,
          },
          {
            locale: {
              language: { code: 'en', label: 'English' },
              encoding: 'utf-8',
              region: { code: 'CA', label: 'Canada' },
            },
            expected: 'en_CA.utf-8',
          },
          {
            locale: {
              language: { code: 'en', label: 'English' },
              encoding: 'utf-8',
              region: { code: 'CA', label: 'Canada' },
              modifiers: ['test'],
            },
            expected: 'en_CA.utf-8@test',
          },
          {
            locale: {
              language: { code: 'en', label: 'English' },
              encoding: 'utf-8',
              region: { code: 'CA', label: 'Canada' },
              modifiers: ['test', 'test2'],
            },
            expected: 'en_CA.utf-8@test@test2',
          },
        ];
        vals.forEach((val) => {
          i18n.setLocale(val.locale);
          expect(i18n.getLocaleString()).toEqual(val.expected);
        });
      });
    });
  });
});
