const RestaurentFooter = () => {
  return (
    <footer className="bg-orange-600 py-4">
      <div className="container mx-auto text-center">
        <p className="text-white">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default RestaurentFooter;
