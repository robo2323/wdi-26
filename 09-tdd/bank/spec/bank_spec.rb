require_relative '../bank'

describe Bank do
  describe '.new' do
    it "creates a new bank object" do
      bank = Bank.new 'TDD Bank'
      expect(bank).to_not be nil
    end

    it "assigns the bank a name" do
      bank = Bank.new 'TDD Bank'
      expect(bank.name).to eq 'TDD Bank'
    end
  end

  describe '#create_account' do
    it "creates an account for a particular person" do
      bank = Bank.new 'TDD Bank'
      bank.create_account 'Craigsy', 200
      expect(bank.accounts['Craigsy']).to eq 200
    end
  end
end
