export function getAvailability(nuanceAvailabilityMessage) {
    switch(nuanceAvailabilityMessage){
      case availabilityMessages.Ready:
        return availabilities.Ready;
      case availabilityMessages.Busy:
        return availabilities.Busy;
      case availabilityMessages.InProgress:
        return availabilities.InProgress;
      case availabilityMessages.Offline:
        return availabilities.Offline;
      case availabilityMessages.InChat:
        return availabilities.InChat;
      default:
        return availabilities.NotResponding; 
    }
  }

export const availabilityMessages = Object.freeze({
      Ready: "Advisers are available to chat.", 
      Busy: "All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.",
      InProgress: "You are in a webchat.",
      Offline: "Our webchat is now closed.",
      InChat: "You are in a webchat. If you cannot access it, you may have another chat window open."
  })


export const availabilities = Object.freeze({
      Ready: "Ready", 
      Busy: "Busy",
      InProgress: "In Progress",
      Offline: "Offline",
      InChat: "In Chat",
      NotResponding: "Not Responding",
      NuanceUnavailable: "Nuance Unavailable"
  })