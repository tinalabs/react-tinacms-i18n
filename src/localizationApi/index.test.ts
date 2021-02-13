import { Locale, LocalizationApi } from './index';

describe('Localization API', () => {
  describe('#local = newLocale ', () => {
    const options = {
      localeList: [
        { language: {
          code: 'en',
          label: 'English',
          }
        },
        { language: {
          code: 'fr',
          label: 'French',
          }
        },
      ],
      locale: { language: {
        code: 'fr',
        label: 'French',
        }
      },
      imgMap: {}
    }
    const localAPI = new LocalizationApi();
    const localDefaultAPI = new LocalizationApi(options);
    it('instantiates with default values', () => {
      const expectedDefault: Locale = {
        language: {
          code: 'en',
          label: 'English',
        },
      };
      const expectedLocalDefault: Locale = {
        language: {
          code: 'fr',
          label: 'French',
        },
      };

      expect(localAPI.getLocale()).toStrictEqual(expectedDefault);
      expect(localDefaultAPI.getLocale()).toStrictEqual(expectedLocalDefault);
    });

    it('updates the locale to be newLocale', () => {
      const newLocal: Locale = {
        language: { code: 'en', label: 'English' },
        encoding: 'utf-8',
      };
      localAPI.setLocale(newLocal);
      expect(localAPI.getLocale()).toBe(newLocal);
    });
  });

  describe('#getFormateLocale()', () => {
    const localAPI = new LocalizationApi();
    describe('the return types matches language[_region][.encoding][@modifier]when retrieved', () => {
      it('adds a . in front of the encoding', () => {
        localAPI.setLocale({
          language: { code: 'en', label: 'English' },
          encoding: 'utf-8',
        });
        expect(localAPI.getFormateLocale()).toBe('en.utf-8');
        localAPI.setLocale({
          language: { code: 'fr', label: 'French' },
          encoding: 'utf-16',
        });
        expect(localAPI.getFormateLocale()).toBe('fr.utf-16');
      });
      it('adds a _ in front of the region', () => {
        localAPI.setLocale({
          language: { code: 'sp', label: 'Spanish' },
          region: { code: 'CA', label: 'Canada' },
        });
        expect(localAPI.getFormateLocale()).toBe('sp_CA');
        localAPI.setLocale({
          language: { code: 'en', label: 'English' },
          region: { code: 'US', label: 'United States' },
        });
        expect(localAPI.getFormateLocale()).toBe('en_US');
      });
      it('adds a @ in front of the modifiers', () => {
        localAPI.setLocale({
          language: { code: 'sp', label: 'Spanish' },
          modifiers: ['asdf', 'asdf2'],
        });
        expect(localAPI.getFormateLocale()).toBe('sp@asdf@asdf2');
        localAPI.setLocale({
          language: { code: 'en', label: 'English' },
          modifiers: ['example', 'example2'],
        });
        expect(localAPI.getFormateLocale()).toBe('en@example@example2');
        localAPI.setLocale({
          language: { code: 'en', label: 'English' },
          modifiers: ['1', '23', '4', '5', '6', '7', '8', '9', '10'],
        });
        expect(localAPI.getFormateLocale()).toBe('en@1@23@4@5@6@7@8@9@10');
      });
      it('returns the items in the order <lang>[region][encoding][...modifiers]', () => {
        const rand = Math.floor(Math.random() * 100);
        localAPI.setLocale({});
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
          localAPI.setLocale(val.locale);
          expect(localAPI.getFormateLocale()).toEqual(val.expected);
        });
      });
    });
  });
});
