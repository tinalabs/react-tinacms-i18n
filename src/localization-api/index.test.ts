import { Locale, LocalizationApi } from './index';

describe('Localization API', () => {
  describe('#local = newLocale ', () => {
    const localAPI = new LocalizationApi();
    it('updates the locale to be newLocale', () => {
      const newLocal: Locale = {
        language: 'en',
        encoding: 'utf-8',
      };
      localAPI.locale = newLocal;
      expect(localAPI.locale).toBe(newLocal);
    });
  });

  describe('#local = newLocale ', () => {
    const localAPI = new LocalizationApi();
    it('updates the locale to be newLocale', () => {
      const newLocal: Locale = {
        language: 'en',
        encoding: 'utf-8',
      };
      localAPI.locale = newLocal;
      expect(localAPI.locale).toBe(newLocal);
    });
  });
  describe('#getFormateLocale()', () => {
    const localAPI = new LocalizationApi();
    describe('the return types matches language[_region][.encoding][@modifier]when retrieved', () => {
      it('adds a . in front of the encoding', () => {
        localAPI.locale = {
          language: 'en',
          encoding: 'utf-8',
        };
        expect(localAPI.getFormateLocale()).toBe('en.utf-8');
        localAPI.locale = {
          language: 'fr',
          encoding: 'utf-16',
        };
        expect(localAPI.getFormateLocale()).toBe('fr.utf-16');
      });
      it('adds a _ in front of the region', () => {
        localAPI.locale = {
          language: 'sp',
          region: 'CA',
        };
        expect(localAPI.getFormateLocale()).toBe('sp_CA');
        localAPI.locale = {
          language: 'en',
          region: 'US',
        };
        expect(localAPI.getFormateLocale()).toBe('en_US');
      });
      it('adds a @ in front of the modifiers', () => {
        localAPI.locale = {
          language: 'sp',
          modifiers: ['asdf', 'asdf2'],
        };
        expect(localAPI.getFormateLocale()).toBe('sp@asdf@asdf2');
        localAPI.locale = {
          language: 'en',
          modifiers: ['example', 'example2'],
        };
        expect(localAPI.getFormateLocale()).toBe('en@example@example2');
        localAPI.locale = {
          language: 'en',
          modifiers: ['1', '23', '4', '5', '6', '7', '8', '9', '10'],
        };
        expect(localAPI.getFormateLocale()).toBe('en@1@23@4@5@6@7@8@9@10');
      });
      it('returns the items in the order <lang>[region][encoding][...modifiers]', () => {
        const rand = Math.floor(Math.random() * 100);
        localAPI.locale = {};
        const vals: { locale: Locale; expected: string }[] = [
          {
            locale: {
              language: 'en',
              encoding: 'utf-8',
            },
            expected: 'en.utf-8',
          },
          {
            locale: {
              language: 'en',
              encoding: `utf-${rand}`,
            },
            expected: `en.utf-${rand}`,
          },
          {
            locale: {
              language: 'en',
              encoding: 'utf-8',
              region: 'CA',
            },
            expected: 'en_CA.utf-8',
          },
          {
            locale: {
              language: 'en',
              encoding: 'utf-8',
              region: 'CA',
              modifiers: ['test'],
            },
            expected: 'en_CA.utf-8@test',
          },
          {
            locale: {
              language: 'en',
              encoding: 'utf-8',
              region: 'CA',
              modifiers: ['test', 'test2'],
            },
            expected: 'en_CA.utf-8@test@test2',
          },
        ];
        vals.forEach((val) => {
          localAPI.locale = val.locale;
          expect(localAPI.getFormateLocale()).toEqual(val.expected);
        });
      });
    });
  });
});
