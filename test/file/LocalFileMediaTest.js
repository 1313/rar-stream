import chai from 'chai';
import path from 'path';

let expect = chai.expect;
chai.should();

let singleFile = path.resolve(__dirname, '../binary-data/single-short-filename.rar');
import LocalFileMedia from '../../src/file/LocalFileMedia';

describe('LocalFileMedia', () => {
  describe('#constructor', () => {
    it('should be constructable', () => {
      expect(new LocalFileMedia(path.resolve(__dirname, "./LocalFileMediaTest.js"))).to.be.an.instanceOf(LocalFileMedia);
    });
    it('should throw if constructor parameter is not a string', () => {
      expect(() => new LocalFileMedia(1)).to.throw(/Invalid Arguments/);
      expect(() => new LocalFileMedia()).to.throw(/Invalid Arguments/);
      expect(() => new LocalFileMedia({})).to.throw(/Invalid Arguments/);
      expect(() => new LocalFileMedia(null)).to.throw(/Invalid Arguments/);
    });
    it('should throw if path does not point to a local file', () => {
      expect(() => new LocalFileMedia("not a local file")).to.throw(/ENOENT: no such file or directory/);

    });
    it('should parse path and read file size if string is passed as options', () => {
      let instance = new LocalFileMedia(singleFile);
      expect(instance.name).to.equal('single-short-filename.rar');
      expect(instance.size).to.equal(571016);
    });
  });
});