interface Borrowable {
    borrow(memberName: string): string;
    returnItem(): string;
    isAvailable(): boolean;
}

abstract class LibraryItem implements Borrowable {
    private _title: string;
    protected itemId: string;
    private _available: boolean;

    constructor(title: string, itemId: string) {
        this._title = title;
        this.itemId = itemId;
        this._available = true;
    }

    getTitle(): string {
        return this._title;
    }

    setAvailable(available: boolean): void {
        this._available = available;
    }
    // New public getter method for itemId
    public getItemId(): string {
        return this.itemId;
    }


    abstract getDetails(): string;

    isAvailable(): boolean {
        return this._available;
    }

    borrow(memberName: string): string {
        if (this._available) {
            this._available = false;
            return `Item "${this._title}" borrowed by ${memberName}`;
        } else {
            return `Item "${this._title}" is currently not available`;
        }
    }

    returnItem(): string {
        this._available = true;
        return `Item "${this._title}" returned`;
    }
}

class Book extends LibraryItem {
    private author: string;

    constructor(title: string, itemId: string, author: string) {
        super(title, itemId);
        this.author = author;
    }
    getDetails(): string {
        return `Book: ${this.getTitle()} by ${this.author} (ID: ${this.itemId})`;
    }
}

class Magazine extends LibraryItem {
    private issueDate: string;

    constructor(title: string, itemId: string, issueDate: string) {
        super(title, itemId);
        this.issueDate = issueDate;
    }
    getDetails(): string {
        return `Magazine: ${this.getTitle()} (ID: ${this.itemId}), Issue Date: ${this.issueDate}`;
    }
}
class DVD extends LibraryItem {
    private issueDate: string;
    private director: string;

    constructor(title: string, itemId: string, issueDate: string, director: string) {
        super(title, itemId);
        this.issueDate = issueDate;
        this.director = director;
    }
    getDetails(): string {
        return `DVD: ${this.getTitle()} (ID: ${this.itemId}), Issue Date: ${this.issueDate}, Director: ${this.director}`;
    }
}
class AudioBook extends LibraryItem {
    private issueDate: string;
    private author: string;
    constructor(title: string, itemId: string, issueDate: string, author: string) {
        super(title, itemId);
        this.issueDate = issueDate;
        this.author = author;
    }
    getDetails(): string {
        return `AudioBook: ${this.getTitle()} (ID: ${this.itemId}), Issue Date: ${this.issueDate}, Author: ${this.author}`;
    }
}
class car extends LibraryItem {
    private issueDate: string   
    private manufacturer: string;
    constructor(title: string, itemId: string, issueDate: string, manufacturer: string) {
        super(title, itemId);
        this.issueDate = issueDate;
        this.manufacturer = manufacturer;
    }   
    getDetails(): string {
        return `car: ${this.getTitle()} (ID: ${this.itemId}), Issue Date: ${this.issueDate}, Manufacturer: ${this.manufacturer}`;
    }
}
class LibraryMember {

    private memberName: string;
    private memberId: string;
    private borrowedItems: LibraryItem[];

    constructor(memberName: string, memberId: string) {
        this.borrowedItems = [];
        this.memberName = memberName;
        this.memberId = memberId;
    }

    getMemberName(): string {
        return this.memberName;
    }

    getMemberId(): string {
        return this.memberId;
    }

    borrowItem(item: LibraryItem): string {
        if (item.isAvailable()) {
            const borrowMessage = item.borrow(this.memberName);
            this.borrowedItems.push(item);
            return borrowMessage;
        } else {
            return "Item not available";
        }
    }

    returnItem(itemId: string): string {
        // Corrected line: use the new public getter method
        const itemIndex = this.borrowedItems.findIndex(item => item.getItemId() === itemId);

        if (itemIndex !== -1) {
            const returnMessage = this.borrowedItems[itemIndex].returnItem();
            this.borrowedItems.splice(itemIndex, 1);
            return returnMessage;
        } else {
            return "Item not found in borrowed items";
        }
    }

    listBorrowedItems(): string {
        if (this.borrowedItems.length === 0) {
            return "No items borrowed.";
        }
        return this.borrowedItems.map(item => item.getDetails()).join("\n");
    }
}
class Library {
    private items: LibraryItem[];
    private members: LibraryMember[];

    constructor() {
        this.items = [];
        this.members = [];
    }

    addItem(item: LibraryItem): void {
        this.items.push(item);
    }

    addMember(member: LibraryMember): void {
        this.members.push(member);
    }

    findItemById(itemId: string): LibraryItem | undefined {
        // Corrected line: use the new public getter method
        return this.items.find(item => item.getItemId() === itemId);
    }

    findMemberById(memberId: string): LibraryMember | undefined {
        return this.members.find(member => member.getMemberId() === memberId);
    }

    borrowItem(memberId: string, itemId: string): string {
        const member = this.findMemberById(memberId);
        const item = this.findItemById(itemId);
        if (member && item) {
            return member.borrowItem(item);
        }
        return "Member or item not found";
    }

    returnItem(memberId: string, itemId: string): string {
        const member = this.findMemberById(memberId);
        if (member) {
            return member.returnItem(itemId);
        }
        return "Member or item not found";
    }

    getLibrarySummary(): string {
        const itemDetails = this.items.map(item => item.getDetails()).join("\n");
        const memberDetails = this.members.map(member => member.getMemberName()).join("\n");
        return `Library Items:\n${itemDetails}\n\nLibrary Members:\n${memberDetails}`;
    }
}
 