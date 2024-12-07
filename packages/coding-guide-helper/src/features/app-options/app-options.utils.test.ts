import { isValidHttpUrl } from './app-options.utils'

describe('app-options utils tests suite', () => {
  describe('isValidHttpUrl', () => {
    it.each`
      link                               | expected | description
      ${null}                            | ${false} | ${'Null is not a valid URL'}
      ${undefined}                       | ${false} | ${'Undefined is not a valid URL'}
      ${''}                              | ${false} | ${'Empty string is not a valid URL'}
      ${12345}                           | ${false} | ${'Non-string input is not a valid URL'}
      ${'example.com'}                   | ${false} | ${'Missing protocol (http or https)'}
      ${'http://'}                       | ${false} | ${'Incomplete HTTP URL'}
      ${'https://'}                      | ${false} | ${'Incomplete HTTPS URL'}
      ${'ftp://example.com'}             | ${false} | ${'Unsupported FTP protocol'}
      ${'mailto:test@example.com'}       | ${false} | ${'Unsupported mailto protocol'}
      ${'invalid-url'}                   | ${false} | ${'Invalid URL format'}
      ${'http://example.com'}            | ${true}  | ${'Valid HTTP URL'}
      ${'https://example.com'}           | ${true}  | ${'Valid HTTPS URL'}
      ${'http://localhost'}              | ${true}  | ${'Valid localhost URL'}
      ${'https://192.168.0.1'}           | ${true}  | ${'Valid HTTPS URL with IP address'}
      ${'http://[::1]'}                  | ${true}  | ${'Valid HTTP URL with IPv6'}
      ${'https://sub.domain.com'}        | ${true}  | ${'Valid HTTPS URL with subdomain'}
      ${'https://example.com:8080/path'} | ${true}  | ${'Valid HTTPS URL with port and path'}
      ${'http://example.com?query=test'} | ${true}  | ${'Valid HTTP URL with query parameters'}
    `('should return $expected for {link: $link} because $description', ({ link, expected, description }) => {
      expect(isValidHttpUrl(link as string)).toBe(expected)
    })
  })
})
