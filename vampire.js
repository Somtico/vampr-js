class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal
    );
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  closestCommonAncestor(vampire) {
    const getAncestors = (vampire) => {
      const ancestors = [];
      while (vampire) {
        ancestors.push(vampire);
        vampire = vampire.creator;
      }
      return ancestors;
    };

    // Get the ancestors of both vampires
    const thisAncestors = getAncestors(this);
    const otherAncestors = getAncestors(vampire);

    // Find the closest common ancestor
    let commonAncestor = null;
    while (thisAncestors.length && otherAncestors.length) {
      const thisAncestor = thisAncestors.pop(); // Get the most senior remaining ancestor of `this`
      const otherAncestor = otherAncestors.pop(); // Get the most senior remaining ancestor of `vampire`

      if (thisAncestor === otherAncestor) {
        commonAncestor = thisAncestor; // Update the closest common ancestor
      } else {
        break; // If they are different, stop comparing
      }
    }

    return commonAncestor; // Return the closest common ancestor found
  }
}

module.exports = Vampire;
